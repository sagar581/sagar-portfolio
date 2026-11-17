<script setup>
// A small model of a UPI payment: payer apps on the left, the switch in the
// middle, banks on the right. Packets travel app -> switch -> bank.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const emit = defineEmits(['phase'])
const host = ref(null)
const labels = ref([
  { text: 'Payer apps', x: 0, y: 0, show: false },
  { text: 'Switch', x: 0, y: 0, show: false },
  { text: 'Banks', x: 0, y: 0, show: false },
])

const C = {
  node: new THREE.Color('#aebbff'),
  edge: new THREE.Color('#4c5fd6'),
  pay: new THREE.Color('#ffb020'),
  ok: new THREE.Color('#3ddc97'),
}

let renderer, scene, camera, net, raf = 0, visible = true, disposed = false
let startPayment = () => {}
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Seeded random so the network looks the same on every visit.
function rng(seed) {
  let s = seed
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

function pointsMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uScale: { value: 1 } },
    vertexShader: `
      attribute float aSize; attribute vec3 aColor; attribute float aAlpha;
      varying vec3 vColor; varying float vAlpha; uniform float uScale;
      void main(){
        vColor = aColor; vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uScale / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, a * a * vAlpha);
      }`,
  })
}

function makePoints(count) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(count), 1))
  g.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count), 1))
  const p = new THREE.Points(g, pointsMaterial())
  p.frustumCulled = false
  return p
}

onMounted(() => {
  const el = host.value
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch (e) {
    return // No WebGL: the hero still reads fine without the scene.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 0, 19)
  net = new THREE.Group()
  scene.add(net)

  const rand = rng(581)

  // --- nodes -------------------------------------------------------------
  const PAYERS = 15, BANKS = 11
  const nodes = []
  for (let i = 0; i < PAYERS + BANKS; i++) {
    const side = i < PAYERS ? -1 : 1
    const v = new THREE.Vector3(side * (0.5 + rand() * 0.5), (rand() - 0.5) * 1.5, (rand() - 0.5) * 1.3).normalize()
    v.multiplyScalar(side < 0 ? 5.2 + rand() * 2.6 : 4.8 + rand() * 2.2)
    nodes.push({ pos: v, side, flash: 0 })
  }
  const nodePts = makePoints(nodes.length)
  nodes.forEach((n, i) => {
    nodePts.geometry.attributes.position.setXYZ(i, n.pos.x, n.pos.y, n.pos.z)
    nodePts.geometry.attributes.aColor.setXYZ(i, C.node.r, C.node.g, C.node.b)
    nodePts.geometry.attributes.aSize.setX(i, n.side < 0 ? 44 : 60)
    nodePts.geometry.attributes.aAlpha.setX(i, 0.95)
  })
  net.add(nodePts)

  // --- edges (node -> switch), gently curved ------------------------------
  const SEG = 28
  const curves = nodes.map((n) => {
    const mid = n.pos.clone().multiplyScalar(0.5)
    const lift = new THREE.Vector3(0, 1, 0).cross(n.pos).normalize().multiplyScalar((rand() - 0.5) * 2.4)
    lift.y += (rand() - 0.5) * 1.6
    return new THREE.QuadraticBezierCurve3(n.pos.clone(), mid.add(lift), new THREE.Vector3(0, 0, 0))
  })
  const ePos = [], eCol = []
  const tmp = new THREE.Color()
  curves.forEach((c) => {
    const pts = c.getPoints(SEG)
    for (let i = 0; i < SEG; i++) {
      ePos.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z)
      for (const t of [i / SEG, (i + 1) / SEG]) {
        tmp.copy(C.edge).multiplyScalar(0.28 + t * 0.9)
        eCol.push(tmp.r, tmp.g, tmp.b)
      }
    }
  })
  const eGeo = new THREE.BufferGeometry()
  eGeo.setAttribute('position', new THREE.Float32BufferAttribute(ePos, 3))
  eGeo.setAttribute('color', new THREE.Float32BufferAttribute(eCol, 3))
  net.add(new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })))

  // --- the switch ---------------------------------------------------------
  const core = new THREE.Group()
  const shell = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.15, 1)),
    new THREE.LineBasicMaterial({ color: C.pay, transparent: true, opacity: 0.9 })
  )
  const shell2 = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.7, 0)),
    new THREE.LineBasicMaterial({ color: C.node, transparent: true, opacity: 0.35 })
  )
  const heart = makePoints(1)
  heart.geometry.attributes.aColor.setXYZ(0, C.pay.r, C.pay.g, C.pay.b)
  heart.geometry.attributes.aSize.setX(0, 260)
  heart.geometry.attributes.aAlpha.setX(0, 0.9)
  core.add(shell, shell2, heart)
  net.add(core)

  // --- success ring ---------------------------------------------------------
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.92, 1, 64),
    new THREE.MeshBasicMaterial({ color: C.ok, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  scene.add(ring)
  let ringT = -1

  // --- packets --------------------------------------------------------------
  const POOL = 34, TRAIL = 12
  const packets = Array.from({ length: POOL }, () => ({ on: false, a: 0, b: 0, t: 0, speed: 1, hero: false }))
  const pktPts = makePoints(POOL * TRAIL)
  net.add(pktPts)
  const v3 = new THREE.Vector3()
  const along = (p, t) => (t < 1 ? curves[p.a].getPoint(Math.max(t, 0), v3) : curves[p.b].getPoint(Math.max(2 - t, 0), v3))

  function launch(hero) {
    const p = hero ? packets[0] : packets.slice(1).find((x) => !x.on)
    if (!p) return
    p.on = true
    p.hero = !!hero
    p.t = 0
    p.a = Math.floor(rand() * PAYERS)
    p.b = PAYERS + Math.floor(rand() * BANKS)
    p.speed = hero ? 0.62 : 0.5 + rand() * 0.5
    p.phase = 0
    if (hero) {
      // Prefer nodes facing the viewer so the payment is easy to follow.
      let best = -9
      for (let i = 0; i < PAYERS; i++) if (nodes[i].pos.z - Math.abs(nodes[i].pos.y) * 0.4 > best) { best = nodes[i].pos.z - Math.abs(nodes[i].pos.y) * 0.4; p.a = i }
      best = -9
      for (let i = PAYERS; i < nodes.length; i++) if (nodes[i].pos.z - Math.abs(nodes[i].pos.y) * 0.4 > best) { best = nodes[i].pos.z - Math.abs(nodes[i].pos.y) * 0.4; p.b = i }
      nodes[p.a].flash = 1
      emit('phase', 0)
    }
  }
  startPayment = () => { if (!packets[0].on) launch(true) }

  // --- dust -------------------------------------------------------------------
  const DUST = 420
  const dust = makePoints(DUST)
  for (let i = 0; i < DUST; i++) {
    const r = 9 + rand() * 16
    const th = rand() * Math.PI * 2, ph = Math.acos(2 * rand() - 1)
    dust.geometry.attributes.position.setXYZ(i, r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th) - 6)
    dust.geometry.attributes.aColor.setXYZ(i, C.node.r, C.node.g, C.node.b)
    dust.geometry.attributes.aSize.setX(i, 8 + rand() * 14)
    dust.geometry.attributes.aAlpha.setX(i, 0.15 + rand() * 0.35)
  }
  scene.add(dust)

  // --- layout -------------------------------------------------------------------
  let wide = true
  function resize() {
    const w = el.clientWidth, h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    wide = w > 900
    const s = wide ? 0.86 : Math.max(0.42, Math.min(0.78, w / 860))
    net.scale.setScalar(s)
    net.position.set(wide ? Math.min(5.7, camera.aspect * 3.35) : 0, wide ? 0.2 : 4.3, 0)
    const px = renderer.getPixelRatio()
    for (const m of [nodePts, pktPts, heart, dust]) m.material.uniforms.uScale.value = px * (h / 900) * 5.5 * (m === dust ? 0.6 : s)
    draw(0)
  }

  // --- pointer --------------------------------------------------------------------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  // Tap or click the network to send a burst of traffic through the switch.
  const onTap = () => { for (let i = 0; i < 7; i++) launch(false); burst = 1 }
  el.addEventListener('pointerdown', onTap)

  // --- frame ----------------------------------------------------------------------
  const clock = new THREE.Clock()
  let time = 0, nextAmbient = 0.4, burst = 0
  const anchor = [new THREE.Vector3(-6.2, 3.6, 0), new THREE.Vector3(0, 2.3, 0), new THREE.Vector3(5.6, 3.4, 0)]

  function draw(dt) {
    time += dt
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3)
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3)
    net.rotation.y = (reduced ? 0 : Math.sin(time * 0.16) * 0.3) + pointer.x * 0.22
    net.rotation.x = (reduced ? 0 : Math.sin(time * 0.11) * 0.06) + pointer.y * 0.12
    shell.rotation.x += dt * 0.35; shell.rotation.y += dt * 0.5
    shell2.rotation.y -= dt * 0.2; shell2.rotation.z += dt * 0.12
    dust.rotation.y = time * 0.01

    if (!reduced && time > nextAmbient) { launch(false); nextAmbient = time + 0.25 + rand() * 0.6 }

    const pos = pktPts.geometry.attributes.position, col = pktPts.geometry.attributes.aColor
    const size = pktPts.geometry.attributes.aSize, alpha = pktPts.geometry.attributes.aAlpha
    burst = Math.max(0, burst - dt * 1.6)
    let corePulse = burst
    packets.forEach((p, pi) => {
      if (p.on) {
        p.t += dt * p.speed
        if (p.hero) {
          const marks = [0.42, 1.0, 1.58]
          while (p.phase < 3 && p.t >= marks[p.phase]) { p.phase++; emit('phase', p.phase) }
          corePulse = Math.max(corePulse, 1 - Math.min(1, Math.abs(p.t - 1) * 3))
        }
        if (p.t >= 2 + TRAIL * 0.03) {
          p.on = false
        } else if (p.t >= 2 && !p.done) {
          p.done = true
          nodes[p.b].flash = 1
          if (p.hero) { ringT = 0; ring.userData.node = p.b; emit('phase', 4) }
        }
        if (!p.on) p.done = false
      }
      for (let k = 0; k < TRAIL; k++) {
        const i = pi * TRAIL + k
        const t = p.t - k * (p.hero ? 0.022 : 0.03)
        if (!p.on || t < 0 || t > 2) { alpha.setX(i, 0); continue }
        along(p, t)
        pos.setXYZ(i, v3.x, v3.y, v3.z)
        const c = p.hero ? C.pay : C.node
        col.setXYZ(i, c.r, c.g, c.b)
        const f = 1 - k / TRAIL
        size.setX(i, (p.hero ? 120 : 34) * (0.35 + f * 0.65))
        alpha.setX(i, (p.hero ? 1 : 0.6) * f * f)
      }
    })
    pos.needsUpdate = col.needsUpdate = size.needsUpdate = alpha.needsUpdate = true

    // node flashes
    const nc = nodePts.geometry.attributes.aColor, ns = nodePts.geometry.attributes.aSize
    nodes.forEach((n, i) => {
      if (n.flash > 0) n.flash = Math.max(0, n.flash - dt * 0.7)
      tmp.copy(C.node).lerp(n.side < 0 ? C.pay : C.ok, n.flash)
      nc.setXYZ(i, tmp.r, tmp.g, tmp.b)
      ns.setX(i, (n.side < 0 ? 44 : 60) * (1 + n.flash * 1.6))
    })
    nc.needsUpdate = ns.needsUpdate = true

    const beat = 1 + Math.sin(time * 2.2) * 0.04 + corePulse * 0.35
    core.scale.setScalar(beat)
    heart.geometry.attributes.aSize.setX(0, 260 + corePulse * 300)
    heart.geometry.attributes.aSize.needsUpdate = true

    // success ring, always facing the camera
    if (ringT >= 0) {
      ringT += dt
      net.updateMatrixWorld()
      ring.position.copy(nodes[ring.userData.node].pos).applyMatrix4(net.matrixWorld)
      ring.quaternion.copy(camera.quaternion)
      const k = Math.min(1, ringT / 1.4)
      ring.scale.setScalar((0.3 + k * 2.6) * net.scale.x)
      ring.material.opacity = (1 - k) * 0.9
      if (k >= 1) ringT = -1
    }

    // HTML labels follow three anchor points
    net.updateMatrixWorld()
    const w = el.clientWidth, h = el.clientHeight
    anchor.forEach((a, i) => {
      v3.copy(a).applyMatrix4(net.matrixWorld).project(camera)
      labels.value[i].x = (v3.x * 0.5 + 0.5) * w
      labels.value[i].y = (-v3.y * 0.5 + 0.5) * h
      labels.value[i].show = wide
    })

    renderer.render(scene, camera)
  }

  function loop() {
    if (disposed) return
    raf = requestAnimationFrame(loop)
    const dt = Math.min(clock.getDelta(), 0.05)
    if (visible && !document.hidden) draw(dt)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
  io.observe(el)
  resize()
  loop()

  onBeforeUnmount(() => {
    disposed = true
    cancelAnimationFrame(raf)
    ro.disconnect(); io.disconnect()
    window.removeEventListener('pointermove', onMove)
    renderer.dispose()
  })
})

defineExpose({ pay: () => startPayment() })
</script>

<template>
  <div ref="host" class="scene" aria-hidden="true">
    <span
      v-for="l in labels"
      :key="l.text"
      class="scene-label"
      :style="{ transform: `translate(${l.x}px, ${l.y}px) translate(-50%, -50%)`, opacity: l.show ? 1 : 0 }"
    >{{ l.text }}</span>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; overflow: hidden; }
.scene :deep(canvas) { width: 100%; height: 100%; display: block; }
.scene-label {
  position: absolute; left: 0; top: 0;
  font: 500 0.75rem/1 var(--mono);
  color: var(--muted);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.4s;
}
</style>
