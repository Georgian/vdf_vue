<template>
  <p>Signing in...</p>
</template>

<script>
import vdfapi from '~/plugins/vdfapi'
export default {
  mounted () {
    let token = this.$route.query.token

    if (!!token) {
      vdfapi.defaults.headers.common['Authorization'] = 'Bearer ' + token

      this.$store.dispatch('modules/auth/loginSuccess', token)
        .then(() => {
          this.$router.replace('/')
        })
    } else {
      console.error('No Token present. Cannot log you in.')
    }
  }
}
</script>

<style scoped>

</style>
