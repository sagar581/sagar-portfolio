<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { person, about, highlights, stack, contact, nav, ticker } from './content.js'
import HeroScene from './components/HeroScene.vue'
import CodeTyper from './components/CodeTyper.vue'
import PassbookSection from './components/PassbookSection.vue'
import WorkSection from './components/WorkSection.vue'
import AppsSection from './components/AppsSection.vue'

const [first, last] = person.name.split(' ')

// ---- hero: slide to pay ----
const scene = ref(null)
const track = ref(null)
const sending = ref(false)
const paid = ref(null)        // receipt shown after a successful test payment
const x = ref(0)              // knob position in px
const dragging = ref(false)
const nudge = ref(false)
let startX = 0, max = 0, t0 = 0, got = false

function down(e) {
  if (sending.value || paid.value) return
  dragging.value = true
  max = track.value.clientWidth - e.currentTarget.offsetWidth - 12
  startX = e.clientX - x.value
  e.currentTarget.setPointerCapture(e.pointerId)
}
function move(e) {
  if (dragging.value) x.value = Math.max(0, Math.min(max, e.clientX - startX))
}
function up() {
  if (!dragging.value) return
  dragging.value = false
  if (x.value > max * 0.8) { x.value = max; pay() } else {
    if (x.value < 6) { nudge.value = true; setTimeout(() => (nudge.value = false), 700) }
    x.value = 0
  }
}
// Keyboard users press Enter or Space on the knob instead of dragging.
function key() {
  if (sending.value || paid.value) return
  x.value = track.value.clientWidth - 64
  pay()
}
function pay() {
  if (sending.value) return
  sending.value = true
  got = false
  t0 = performance.now()
  scene.value?.pay()
  // If WebGL is unavailable the scene never answers, so finish on a timer.
  setTimeout(() => { if (!got) setTimeout(() => onPhase(4), 1800) }, 500)
}
function onPhase(p) {
  got = true
  if (p !== 4 || !sending.value) return
  sending.value = false
  const now = new Date()
  paid.value = {
    took: ((performance.now() - t0) / 1000).toFixed(1),
    ref: String(Math.floor(1e11 + Math.random() * 9e11)),
    at: now.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
  }
}
function done() { paid.value = null; x.value = 0 }

const confetti = computed(() => Array.from({ length: 22 }, (_, i) => ({
  '--a': `${(i / 22) * 360 + (i % 3) * 9}deg`,
  '--d': `${90 + ((i * 53) % 110)}px`,
  '--r': `${(i * 97) % 360}deg`,
  '--c': ['var(--pay)', 'var(--ok)', '#ffffff', '#7f93ff'][i % 4],
  '--t': `${0.9 + (i % 5) * 0.12}s`,
})))

// ---- contact ----
const declined = ref(false)

// ---- bottom nav: highlight the section in view ----
const current = ref('home')
let io
onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) current.value = e.target.id })
  }, { rootMargin: '-45% 0px -50% 0px' })
  nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <a class="skip" href="#passbook">Skip to the passbook</a>

  <main>
    <!-- Hero -->
    <section id="home" class="hero" :class="{ flash: paid }">
      <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
      <HeroScene ref="scene" @phase="onPhase" />

      <div class="ticker" aria-hidden="true">
        <div class="ticker-run">
          <span v-for="n in 2" :key="n"><b v-for="t in ticker" :key="t">+ {{ t }}</b></span>
        </div>
      </div>

      <div class="wrap hero-inner">
        <p class="where">{{ person.role }} at {{ person.company }}, {{ person.city }}</p>
        <h1 :aria-label="person.name">
          <span class="line" aria-hidden="true"><span v-for="(c, i) in first" :key="i" class="ch" :style="{ '--i': i }">{{ c }}</span></span>
          <span class="line" aria-hidden="true"><span v-for="(c, i) in last" :key="i" class="ch" :style="{ '--i': i + first.length }">{{ c }}</span></span>
        </h1>
        <p class="headline">{{ person.headline }}</p>

        <div class="pay">
          <div ref="track" class="slide" :class="{ sending, dragging, nudge, paid: !!paid }">
            <span class="slide-fill" :style="{ width: `${x + 58}px` }"></span>
            <span class="slide-label">{{ paid ? 'Paid' : sending ? 'Sending payment' : 'Slide to send a test payment' }}</span>
            <button
              class="knob" :style="{ transform: `translateX(${x}px)` }" :disabled="sending"
              aria-label="Send a test payment"
              @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up"
              @keydown.enter.prevent="key" @keydown.space.prevent="key"
            >{{ paid ? '✓' : '₹' }}</button>
          </div>
          <a class="link" href="#passbook">Read the passbook</a>
        </div>
        <p class="receipt">
          <template v-if="sending">Routing through the switch.</template>
          <template v-else>No money moves. Slide to watch a UPI payment travel, or tap the network.</template>
        </p>
      </div>

      <!-- Success sheet -->
      <transition name="sheet">
        <div v-if="paid" class="paid-sheet" role="status" aria-live="polite">
          <div class="burst" aria-hidden="true"><i v-for="(c, i) in confetti" :key="i" :style="c"></i></div>
          <svg class="tick-big" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="36" /><path d="M24 41.5 35.5 53 57 29" />
          </svg>
          <p class="paid-title">Payment successful</p>
          <p class="paid-amount">₹0.00</p>
          <p class="paid-sub">Paid to {{ person.name }}. It is on the house.</p>
          <dl>
            <div><dt>Ref no.</dt><dd>{{ paid.ref }}</dd></div>
            <div><dt>Time taken</dt><dd>{{ paid.took }} s</dd></div>
            <div><dt>On</dt><dd>{{ paid.at }}</dd></div>
            <div><dt>Remark</dt><dd>Getting money there safely is my day job</dd></div>
          </dl>
          <div class="paid-actions">
            <a class="btn" href="#passbook" @click="done">Open the passbook</a>
            <button class="btn ghost" @click="done">Done</button>
          </div>
        </div>
      </transition>
    </section>

    <!-- About -->
    <section class="wrap section about">
      <div v-reveal>
        <h2>{{ about.title }}</h2>
        <CodeTyper />
      </div>
      <div class="about-body" v-reveal>
        <p v-for="p in about.paragraphs" :key="p">{{ p }}</p>
        <p class="off">Off the clock: {{ about.offHours.join(', ').toLowerCase() }}.</p>
      </div>
    </section>

    <!-- Highlights -->
    <section class="wrap section hard">
      <h2 v-reveal>{{ highlights.title }}</h2>
      <p class="lede" v-reveal>{{ highlights.intro }}</p>
      <ul class="hard-list">
        <li v-for="h in highlights.items" :key="h.head" v-reveal>
          <h3>{{ h.head }}</h3>
          <p>{{ h.body }}</p>
          <span class="hard-where">{{ h.where }}</span>
        </li>
      </ul>
    </section>

    <PassbookSection />
    <WorkSection />
    <AppsSection />

    <!-- Stack -->
    <section class="wrap section stack">
      <h2 v-reveal>{{ stack.title }}</h2>
      <p class="lede">{{ stack.intro }}</p>
      <div class="order" v-reveal>
        <i class="ball" aria-hidden="true"></i>
        <div v-for="(t, i) in stack.tiers" :key="t.name" :class="`tier tier-${i}`" v-reveal>
          <div class="tier-name"><h3>{{ t.name }}</h3><p>{{ t.note }}</p></div>
          <ul><li v-for="x in t.items" :key="x">{{ x }}</li></ul>
        </div>
      </div>
      <p class="kit"><strong>{{ stack.kit.label }}:</strong> {{ stack.kit.items.join(', ') }}.</p>
    </section>

    <!-- Contact -->
    <section id="contact" class="wrap section contact">
      <div class="collect" v-reveal>
        <p class="collect-kind">{{ contact.title }}</p>
        <h2>{{ contact.from }} is requesting</h2>
        <p class="amount">{{ contact.amount }}</p>
        <p class="waiting"><i aria-hidden="true"></i>{{ contact.waiting }}</p>
        <dl>
          <div><dt>For</dt><dd>{{ contact.purpose }}</dd></div>
          <div><dt>Now at</dt><dd>{{ person.company }}, {{ person.city }}</dd></div>
          <div><dt>Open to</dt><dd>{{ person.openTo.join(', ') }}</dd></div>
          <div><dt>To</dt><dd><a :href="`mailto:${person.email}`">{{ person.email }}</a></dd></div>
        </dl>
        <div class="collect-actions">
          <a class="btn" :href="`mailto:${person.email}?subject=Hello%20Sagar`">{{ contact.approve }}</a>
          <button class="btn ghost" @click="declined = true">{{ contact.decline }}</button>
        </div>
        <p v-if="declined" class="declined" role="status">{{ contact.declined }}</p>
      </div>
      <ul class="elsewhere">
        <li v-for="l in person.links" :key="l.label"><a :href="l.url" target="_blank" rel="noopener">{{ l.label }}</a></li>
      </ul>
    </section>
  </main>

  <nav class="tabbar" aria-label="Sections">
    <a v-for="n in nav" :key="n.id" :href="`#${n.id}`" :aria-current="current === n.id ? 'true' : null">{{ n.label }}</a>
  </nav>
</template>
