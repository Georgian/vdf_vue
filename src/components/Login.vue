<template>
  <div>
    <v-btn @click="login">Facebook Login</v-btn>
  </div>
</template>
<script>
import axios from 'axios'
// Exported in a shared file
const myLoginRoutine = user => new Promise((resolve, reject) => {
  axios({ url: '/api/auth/facebook', data: user, method: 'GET' })
    .then(resp => {
      const token = resp.data.token
      localStorage.setItem('user-token', token) // store the token in localstorage
      resolve(resp)
    })
    .catch(err => {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      reject(err)
    })
})

export default {
  name: 'Login',
  methods: {
    login () {
      const { username, password } = this
      myLoginRoutine({ username, password }).then(() => {
        this.$router.push('/home')
      })
    }
  }
}
</script>
