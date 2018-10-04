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
    <!--<v-toolbar-items>-->
      <!--<v-btn flat><font-awesome-icon icon="coffee" />Despre</v-btn>-->
    <!--</v-toolbar-items>-->
  </v-toolbar>
</template>

<script>
import Input from './Input'
export default {
  name: 'vdf-header',
  components: {
    'vdf-input': Input
  }
}
</script>

<style scoped>

</style>
