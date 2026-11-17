<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { work } from '../content.js'

const sec = work.security
const passed = ref(0)          // how many checks have ticked
const running = ref(false)
const blurred = ref(false)
const cameBack = ref(false)
let timers = []

function run() {
  if (running.value) return
  running.value = true
  passed.value = 0
  sec.checks.forEach((_, i) => timers.push(setTimeout(() => {
    passed.value = i + 1
    if (i === sec.checks.length - 1) running.value = false
  }, 320 * (i + 1))))
}

// The same trick as the app switcher blur: hide the panel when the page loses focus.
const onBlur = () => { blurred.value = true; cameBack.value = false }
const onFocus = () => {
  if (!blurred.value) return
  cameBack.value = true
  timers.push(setTimeout(() => { blurred.value = false }, 1400))
  timers.push(setTimeout(() => { cameBack.value = false }, 9000))
}
onMounted(() => { window.addEventListener('blur', onBlur); window.addEventListener('focus', onFocus) })
onBeforeUnmount(() => { window.removeEventListener('blur', onBlur); window.removeEventListener('focus', onFocus); timers.forEach(clearTimeout) })
</script>

<template>
  <section id="work" class="wrap section">
    <p class="when">{{ work.period }}</p>
    <h2>{{ work.title }}</h2>

    <div class="work-grid">
      <article class="app-a" v-reveal>
        <h3>{{ work.securities.name }}</h3>
        <p class="kind">{{ work.securities.kind }}</p>
        <dl class="points">
          <div v-for="p in work.securities.points" :key="p.head"><dt>{{ p.head }}</dt><dd>{{ p.body }}</dd></div>
        </dl>
      </article>

      <article class="app-b" v-reveal>
        <h3>{{ work.dhani.name }}</h3>
        <p class="kind">{{ work.dhani.kind }}</p>
        <div class="phone" role="group" :aria-label="work.dhani.flowsIntro">
          <p class="phone-title">{{ work.dhani.flowsIntro }}</p>
          <ul class="flows">
            <li v-for="(f, i) in work.dhani.flows" :key="f.name" :style="{ '--i': i }"><span class="glyph" :class="{ word: f.icon.length > 1 }" aria-hidden="true">{{ f.icon }}</span>{{ f.name }}</li>
          </ul>
        </div>
        <p class="note">{{ work.dhani.note }}</p>
      </article>

      <article class="secure" :class="{ blurred }" v-reveal>
        <div class="secure-inner">
          <div class="secure-head">
            <div>
              <h3>{{ sec.title }}</h3>
              <p>{{ sec.intro }}</p>
            </div>
            <button class="btn small" :disabled="running" @click="run">{{ running ? 'Running checks' : passed ? 'Run checks again' : 'Run checks' }}</button>
          </div>
          <ul class="checks">
            <li v-for="(c, i) in sec.checks" :key="c.name" :class="{ ok: passed > i }" :title="c.detail">
              <span class="tick" aria-hidden="true"></span>
              <span class="cname">{{ c.name }}</span>
              <span class="sr">{{ c.detail }}. {{ passed > i ? 'Pass' : 'Waiting' }}.</span>
            </li>
          </ul>
          <p class="fine">{{ sec.disclaimer }}</p>
        </div>
        <p v-if="cameBack" class="came-back" role="status">{{ sec.blurNote }}</p>
      </article>
    </div>

    <div class="earlier">
      <h3 class="earlier-title">{{ work.earlier.title }}</h3>
      <div class="earlier-grid">
        <article v-for="r in work.earlier.roles" :key="r.name" v-reveal>
          <p class="when">{{ r.when }}</p>
          <h3>{{ r.name }}</h3>
          <p class="lead">{{ r.lead }}</p>
          <ul><li v-for="p in r.points" :key="p">{{ p }}</li></ul>
        </article>
      </div>
    </div>
  </section>
</template>
