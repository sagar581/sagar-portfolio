import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

// v-reveal: adds the class `in` the first time an element scrolls into view.
const still = matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)
const io = still ? null : new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
}, { rootMargin: '0px 0px -12% 0px' })

createApp(App)
  .directive('reveal', { mounted(el) { el.classList.add('rv'); io ? io.observe(el) : el.classList.add('in') } })
  .mount('#app')
