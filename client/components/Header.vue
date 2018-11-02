<template>
  <v-toolbar>
    <vue-progress-bar></vue-progress-bar>
    <router-link to="/">
      <span class="title ml-3" style="color: black">Vârf de Formă</span>
      <sup class="mr-5" style="background-color: indianred; font-weight: bold">BETA</sup>
    </router-link>
    <v-flex mt-2>
      <vdf-input v-if="$route.name === 'index'"></vdf-input>
    </v-flex>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="login()"><font-awesome-icon icon="sign-in-alt" />Login</v-btn>
      <v-btn flat @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Input from './Input'
export default {
  name: 'vdf-header',
  components: {
    'vdf-input': Input
  },
  methods: {
    async login () {
      await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', { icon: 'sign-in-alt' })
      })
    },
    async logout () {
      await this.$auth.logout().catch(e => {
        this.$toast.show('Error', { icon: 'sign-in-alt' })
      })
    }
  }
}
</script>

<style scoped>

</style>
