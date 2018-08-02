<template>
  <div>
    <v-btn @click="login">Facebook Login</v-btn>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'Login',
  methods: {
    login () {
      Vue.FB.login(function (response) {
        console.log(response)
      }, { scope: 'email' })
    }
  }
}
</script>
