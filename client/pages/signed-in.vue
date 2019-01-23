<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  mounted () {
    let token = this.$route.query.token

    if (!token) {
      console.error('No Token present. Cannot log you in.')
    } else {
      setToken(token)
    }

    this.$router.replace('/')
  }
}
</script>

<style scoped>

</style>
