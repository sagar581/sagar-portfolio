<script setup>
// Types "hello" in each language Sagar picked up, in order.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { hello } from '../content.js'

const idx = ref(0)
const text = ref('')
let timer = 0
const still = matchMedia('(prefers-reduced-motion: reduce)').matches

function step(pos, dir) {
  const full = hello[idx.value].code
  text.value = full.slice(0, pos)
  if (dir > 0 && pos === full.length) return (timer = setTimeout(() => step(pos, -1), 1700))
  if (dir < 0 && pos === 0) { idx.value = (idx.value + 1) % hello.length; return (timer = setTimeout(() => step(0, 1), 250)) }
  timer = setTimeout(() => step(pos + dir, dir), dir > 0 ? 55 : 22)
}
onMounted(() => { if (still) { idx.value = 3; text.value = hello[3].code } else step(0, 1) })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="typer" aria-hidden="true">
    <div class="typer-bar">
      <span v-for="(h, i) in hello" :key="h.lang" :class="{ on: i === idx }">{{ h.lang }}</span>
    </div>
    <pre><code>{{ text }}</code><i class="caret"></i></pre>
  </div>
</template>

<style scoped>
.typer { margin-top: 34px; border-radius: 18px; background: var(--ink-2); border: 1px solid var(--ink-3); overflow: hidden; max-width: 30rem; }
.typer-bar { display: flex; flex-wrap: wrap; gap: 4px; padding: 10px 12px; border-bottom: 1px solid var(--ink-3); font: 500 0.78rem/1 var(--mono); color: var(--muted); }
.typer-bar span { padding: 6px 9px; border-radius: 8px; transition: background 0.3s, color 0.3s; }
.typer-bar span.on { background: var(--pay); color: var(--ink); }
pre { margin: 0; padding: 22px 18px; min-height: 4.6rem; font: 500 clamp(0.85rem, 1.6vw, 1.02rem)/1.4 var(--mono); white-space: pre-wrap; word-break: break-word; }
.caret { display: inline-block; width: 0.55em; height: 1.1em; margin-left: 2px; vertical-align: -0.18em; background: var(--pay); animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>
