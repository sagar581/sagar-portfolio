<script setup>
import { ref } from 'vue'
import { smartLibrary as sl, smallBuilds } from '../content.js'
const tab = ref('student')
</script>

<template>
  <section id="apps" class="wrap section">
    <div class="sl">
      <div class="sl-text" v-reveal>
        <img :src="sl.icon" alt="" class="sl-icon" width="56" height="56" />
        <h2>{{ sl.title }}</h2>
        <p class="lede">{{ sl.summary }}</p>

        <div class="tabs" role="tablist" aria-label="Parts of Smart Library">
          <button v-for="s in sl.sides" :key="s.id" role="tab" :id="`t-${s.id}`" :aria-selected="tab === s.id" :aria-controls="`p-${s.id}`" :tabindex="tab === s.id ? 0 : -1" @click="tab = s.id"
            @keydown.right.prevent="tab = sl.sides[(sl.sides.findIndex(x => x.id === tab) + 1) % sl.sides.length].id"
            @keydown.left.prevent="tab = sl.sides[(sl.sides.findIndex(x => x.id === tab) + sl.sides.length - 1) % sl.sides.length].id">
            {{ s.label }}
          </button>
        </div>
        <template v-for="s in sl.sides" :key="s.id">
          <ul v-show="tab === s.id" :id="`p-${s.id}`" role="tabpanel" :aria-labelledby="`t-${s.id}`" class="feat">
            <li v-for="p in s.points" :key="p">{{ p }}</li>
          </ul>
        </template>

        <div class="actions">
          <a class="btn" :href="sl.playUrl" target="_blank" rel="noopener">Open on Google Play</a>
          <a class="link" :href="sl.siteUrl" target="_blank" rel="noopener">Visit the library’s site</a>
        </div>
      </div>

      <div class="shots" v-reveal>
        <img v-for="(s, i) in sl.shots" :key="i" :src="s.src" :alt="s.alt" :class="`shot s${i}`" width="405" height="720" />
      </div>
    </div>

    <div class="builds">
      <h3>{{ smallBuilds.title }}</h3>
      <ul>
        <li v-for="b in smallBuilds.items" :key="b.name">
          <component :is="b.url ? 'a' : 'span'" :href="b.url" :target="b.url ? '_blank' : null" :rel="b.url ? 'noopener' : null" class="bname">{{ b.name }}</component>
          <span class="btech">{{ b.tech }}</span>
          <span v-if="b.note" class="bnote">{{ b.note }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
