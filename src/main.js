// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'
import VueRouter from 'vue-router'
import InstantSearch from 'vue-instantsearch'
import AlgoliaSearchHelper from 'algoliasearch-helper'
import Home from '@/components/Home'
import Terms from '@/components/Terms'
import EventPage from '@/components/EventPage'
import PageNotFound from '@/components/PageNotFound'
import EventCard from '@/components/EventCard'
import Map from '@/components/Map'
import SportFilter from '@/components/SportFilter'
import Input from '@/components/Input'
import VueWeatherWidget from 'vue-weather-widget'
import '@/plugins/fb-sdk.js'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import './stylus/main.styl'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBicycle, faCalendarAlt, faLocationArrow, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Vuetify, {
  theme: {
    primary: '#F5F5F5'
    // secondary: '#84CEEB',
    // accent: '#8860D0',
    // bckgrnd: '#FAFAFA'
  }
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBE69OXwm8z5UD-6Yr29RcvEAyT9fUvSWA',
    libraries: 'map'
  }
})

Vue.use(VueRouter)
Vue.use(InstantSearch)
Vue.use(AlgoliaSearchHelper)

Vue.component('event-card', EventCard)
Vue.component('vdf-map', Map)
Vue.component('vdf-sport-filter', SportFilter)
Vue.component('vdf-input', Input)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('weather', VueWeatherWidget)

library.add(faBicycle)
library.add(faCalendarAlt)
library.add(faLocationArrow)
library.add(faHeart)

let filter = function (text, length, clamp) {
  clamp = clamp || '...'
  let node = document.createElement('div')
  node.innerHTML = text
  let content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
}
Vue.filter('truncate', filter)

// ----------------------------

// For VDF, I use this to with the ais-index when not on a search page
// See https://stackoverflow.com/questions/43293401/conditionally-rendering-parent-element-keep-inner-html
// TODO make this work and use it !!!!!!
Vue.directive('showButKeepInner', {
  bind (el, bindings) {
    bindings.def.wrap = function (el) {
      // Find all next siblings with data-moved and move back into el
      while (el.nextElementSibling && el.nextElementSibling.dataset.moved) {
        el.appendChild(el.nextElementSibling).removeAttribute('data-moved')
      }
      el.hidden = false
    }

    bindings.def.unwrap = function (el) {
      // Move all children of el outside and mark them with data-moved attr
      Array.from(el.children).forEach(child => {
        el.insertAdjacentElement('afterend', child).setAttribute('data-moved', true)
      })
      el.hidden = true
    }
  },

  inserted (el, bindings) {
    bindings.def[bindings.value ? 'wrap' : 'unwrap'](el)
  },

  update (el, bindings) {
    bindings.def[bindings.value ? 'wrap' : 'unwrap'](el)
  }
})

// ----------------------------

Vue.mixin({
  methods: {
    formatDate: function (dateStartString, dateEndString) {
      let locale = 'ro-RO'
      let options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }

      let dateStart = new Date(dateStartString)
      var result = dateStart.toLocaleDateString(locale, options)

      if (dateEndString) {
        result = result + ' - ' + new Date(dateEndString).toLocaleDateString(locale, options)
      }

      return result
    }
  }
})

// ----------------------------

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/termeni',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/event/:vdfEventId',
      name: 'EventPage',
      component: EventPage,
      props: true
    }
    // {
    //   path: '/event',
    //   name: 'AddEvent',
    //   component: AddEvent
    // },
    // {
    //   path: '/account/login',
    //   name: 'Login',
    //   component: Login
    // }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mounted () {
    document.dispatchEvent(new Event('app.rendered'))
  },
  components: { App },
  template: '<App/>'
})
