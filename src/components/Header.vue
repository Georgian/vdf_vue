<template>
  <v-toolbar color='primary' height="70px">
    <v-container>
      <v-layout>
        <v-flex><router-link to="/">
          <img src='@/assets/logo.png' alt='' style='width:100px;height:40px;cursor:pointer'>
        </router-link>
        </v-flex>
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
