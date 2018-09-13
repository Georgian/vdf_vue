<template>
  <v-toolbar app absolute clipped-left>
    <router-link to="/">
<!--
      <img src='@/assets/vdf_logo.png' alt='' style='width:30px;height:18px' class="ml-3 pt-1">
-->
      <span class="title ml-3" style="color: black">Vârf de Formă</span>
      <sup class="mr-5" style="background-color: indianred; font-weight: bold">BETA</sup>
    </router-link>
    <vdf-input v-if="$route.name === 'Home'" />
    <v-spacer></v-spacer>
    <!--<v-toolbar-items>-->
      <!--<v-btn flat><font-awesome-icon icon="coffee" />Despre</v-btn>-->
    <!--</v-toolbar-items>-->
  </v-toolbar>
</template>

<script>
export default {
  name: 'vdf-header'
}
</script>

<style scoped>

</style>
