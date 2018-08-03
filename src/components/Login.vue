<template>
  <div>
    <v-btn @click="login">Facebook Login</v-btn>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    login () {
      var config = {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
      axios.post('/api/auth/facebook', config).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
