/* eslint-disable */
import Vue from 'vue'

const vue_fb = {}
vue_fb.install = function install (Vue) {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
    console.log('setting fb sdk')
  }(document, 'script', 'facebook-jssdk'))

  window.fbAsyncInit = function () {
    FB.init({
      appId: '214006909435830',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.0'
    })
    FB.AppEvents.logPageView()
    Vue.FB = FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }

  Vue.FB = undefined
}

Vue.use(vue_fb)
