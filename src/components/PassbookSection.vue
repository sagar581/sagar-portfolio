<script setup>
import { reactive } from 'vue'
import { passbook, person } from '../content.js'
import RatingChart from './RatingChart.vue'

const open = reactive({ indiabulls: true })
</script>

<template>
  <section id="passbook" class="wrap section">
    <div class="paper">
      <header class="paper-head">
        <h2>Passbook</h2>
        <p class="lede">Every stop since 2019, entered the way a bank would: who it came from, and what it credited to the account.</p>
        <dl class="acct">
          <div><dt>Account holder</dt><dd>{{ person.name }}</dd></div>
          <div><dt>Opened</dt><dd>2019, Gandhinagar</dd></div>
          <div><dt>Current branch</dt><dd>{{ person.company }}, {{ person.city }}</dd></div>
          <div class="wide"><dt>Open to branches in</dt><dd>{{ person.openTo.join(', ') }}</dd></div>
        </dl>
      </header>

      <div class="cols" aria-hidden="true"><span>Date</span><span>Particulars</span><span>Credited</span></div>

      <ol class="rows">
        <li v-for="e in passbook" :key="e.id" class="row" v-reveal>
          <div class="date">{{ e.date }}<template v-if="e.until"><br /><span>to {{ e.until }}</span></template></div>
          <div class="part">
            <h3>{{ e.from }} <span class="place">{{ e.place }}</span><span v-if="e.current" class="now">Current</span></h3>
            <p>{{ e.what }}</p>
            <RatingChart v-if="e.chart" />
            <button class="more" :aria-expanded="!!open[e.id]" :aria-controls="`d-${e.id}`" @click="open[e.id] = !open[e.id]">
              {{ open[e.id] ? 'Hide details' : 'Show details' }}
            </button>
            <div v-show="open[e.id]" :id="`d-${e.id}`" class="details">
              <ul><li v-for="d in e.details" :key="d">{{ d }}</li></ul>
              <a v-if="e.more" :href="e.more.href" class="jump">{{ e.more.label }}</a>
            </div>
          </div>
          <ul class="credit" aria-label="Credited">
            <li v-for="c in e.credited" :key="c">+ {{ c }}</li>
          </ul>
        </li>
      </ol>

      <p class="closing" v-reveal><span>Closing balance</span><strong>3 years shipping fintech on Android. Still accruing.</strong><i class="stamp" aria-hidden="true">Active<small>since 2019</small></i></p>
    </div>
  </section>
</template>
