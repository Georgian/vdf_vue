<template>
  <v-toolbar color='primary' height="70px">
    <v-container>
      <v-layout>
        <v-flex><img src='@/assets/logo.png' alt='' style='width:100px;height:40px;cursor:pointer'></v-flex>
        <vdf-input v-if="$route.name === 'Home'" />
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: 'vdf-header'
}
</script>

<style scoped>

</style>
