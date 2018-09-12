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
import EventCard from '@/components/EventCard'
import Map from '@/components/Map'
import SportFilter from '@/components/SportFilter'
import Input from '@/components/Input'
import '@/plugins/fb-sdk.js'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import './stylus/main.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#484848',
    secondary: '#84CEEB',
    accent: '#8860D0',
    bckgrnd: '#C1C8E4'
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

let filter = function (text, length, clamp) {
  clamp = clamp || '...'
  let node = document.createElement('div')
  node.innerHTML = text
  let content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
}
Vue.filter('truncate', filter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
  components: { App },
  template: '<App/>'
})
