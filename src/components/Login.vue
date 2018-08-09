<template>
  <div>
    <v-btn @click="login">Facebook Login</v-btn>
  </div>
</template>
<script>
// import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    login () {
      axios.post('http://localhost:8080/api/auth/facebook')
        .then(res => {
          console.log(res)
        })
      // Vue.FB.login(function (response) {
      //   if (response.authResponse) {
      //     console.log(response.authResponse.data)
      //     axios.get('/api/auth/facebook?code=' + response.authResponse.accessToken)
      //       .then(res => {
      //         console.log(res)
      //       })
      //   } else {
      //     // cancelled
      //   }
      // })
    }
  }
}
</script>
