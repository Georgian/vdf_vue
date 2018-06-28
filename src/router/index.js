import Vue from 'vue'
import Vuetify from 'vuetify'
import InstantSearch from 'vue-instantsearch'
import Router from 'vue-router'
import Home from '@/components/Home'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(InstantSearch)
Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
