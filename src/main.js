// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import VueRouter from 'vue-router'
import InstantSearch from 'vue-instantsearch'
import AlgoliaSearchHelper from 'algoliasearch-helper'
import Home from '@/components/Home'
import AddEvent from '@/components/AddEvent'
import EventCard from '@/components/EventCard'
import SportFilter from '@/components/SportFilter'
import Input from '@/components/Input'
import Login from '@/components/Login'
import '@/plugins/fb-sdk.js'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(InstantSearch)
Vue.use(AlgoliaSearchHelper)

Vue.component('event-card', EventCard)
Vue.component('vdf-sport-filter', SportFilter)
Vue.component('vdf-input', Input)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/event',
      name: 'AddEvent',
      component: AddEvent
    },
    {
      path: '/account/login',
      name: 'Login',
      component: Login
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
