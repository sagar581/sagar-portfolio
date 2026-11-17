<script setup>
import { computed, ref } from 'vue'
import { rating } from '../content.js'

const W = 560, H = 170, L = 8, R = 8, T = 26, B = 14
const lo = 1450, hi = 1960
const pts = computed(() =>
  rating.contests.map((c, i) => ({
    ...c,
    x: L + (i / (rating.contests.length - 1)) * (W - L - R),
    y: T + (1 - (c.rating - lo) / (hi - lo)) * (H - T - B),
  }))
)
const path = computed(() => pts.value.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '))
const peakIndex = rating.contests.findIndex((c) => c.rating === rating.peak)
const active = ref(peakIndex)
const cur = computed(() => pts.value[active.value])
const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

function onMove(e) {
  const box = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - box.left) / box.width) * W
  let best = 0
  pts.value.forEach((p, i) => { if (Math.abs(p.x - x) < Math.abs(pts.value[best].x - x)) best = i })
  active.value = best
}
function onKey(e) {
  if (e.key === 'ArrowRight') active.value = Math.min(pts.value.length - 1, active.value + 1)
  else if (e.key === 'ArrowLeft') active.value = Math.max(0, active.value - 1)
  else return
  e.preventDefault()
}
</script>

<template>
  <figure class="chart">
    <svg
      :viewBox="`0 0 ${W} ${H}`" role="img" tabindex="0"
      aria-label="CodeChef rating across 16 contests in 2022, from 1490 to a peak of 1927. Use the arrow keys to step through contests."
      @pointermove="onMove" @pointerdown="onMove" @keydown="onKey"
    >
      <line :x1="L" :x2="W - R" :y1="pts[peakIndex].y" :y2="pts[peakIndex].y" class="peak-line" />
      <path :d="path" class="line" />
      <circle v-for="(p, i) in pts" :key="p.code" :cx="p.x" :cy="p.y" :r="i === active ? 5.5 : 2.6" :class="['dot', { on: i === active }]" />
      <line :x1="cur.x" :x2="cur.x" :y1="cur.y + 8" :y2="H - 4" class="drop" />
    </svg>
    <figcaption aria-live="polite">
      <span class="big">{{ cur.rating }}</span>
      <span>{{ cur.code }}, {{ fmt(cur.date) }}. Rank {{ cur.rank }}.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.chart { margin: 14px 0 4px; max-width: 560px; }
svg { width: 100%; height: auto; display: block; touch-action: pan-y; cursor: crosshair; border-radius: 4px; }
.line { fill: none; stroke: var(--paper-ink); stroke-width: 2; stroke-linejoin: round; }
.peak-line { stroke: var(--paper-rule); stroke-dasharray: 3 5; }
.drop { stroke: var(--paper-ink); stroke-width: 1; opacity: 0.35; }
.dot { fill: var(--paper-ink); transition: r 0.15s; }
.dot.on { fill: var(--credit); stroke: var(--paper); stroke-width: 2; }
figcaption { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; font: 500 0.82rem/1.4 var(--mono); }
.big { font: 800 2rem/1 var(--dot); letter-spacing: 0.02em; color: var(--credit); }
</style>
