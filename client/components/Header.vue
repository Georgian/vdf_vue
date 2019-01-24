<template>
  <v-toolbar app fixed clipped-left>
    <vue-progress-bar></vue-progress-bar>
    <v-toolbar-side-icon v-on:click="showHideDrawer"></v-toolbar-side-icon>
    <router-link to="/">
      <span class="title ml-3" style="text-align:justify; color: black">Vârf de Formă<sup style="color: indianred; font-size: 12px">BETA</sup></span>
    </router-link>
    <v-flex mt-2>
      <vdf-input v-if="$route.name === 'index'"></vdf-input>
    </v-flex>
    <vdf-display-mode-switch></vdf-display-mode-switch>
    <v-spacer></v-spacer>
    <!--<v-toolbar-items>-->
      <!--<v-btn flat><font-awesome-icon icon="coffee" />Despre</v-btn>-->
    <!--</v-toolbar-items>-->
  </v-toolbar>
</template>

<script>
import Input from './Input'
import VdfDisplayModeSwitch from './DisplayModeSwitch'
export default {
  name: 'vdf-header',
  components: {
    VdfDisplayModeSwitch,
    'vdf-input': Input
  },
  methods: {
    showHideDrawer () {
      // this.$store.dispatch('showHideDrawer')
      this.$eventBus.$emit('toggleDrawer');
    }
  }
}
</script>

<style scoped>

</style>
