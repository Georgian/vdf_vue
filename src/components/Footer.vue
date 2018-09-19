<template>
  <v-footer height="100px" color="primary" class="text-xs-center">
    <v-layout column>
      <v-flex mt-10 mb-3>
          Un proiect pilot dezvoltat cu atenție, din pasiune <font-awesome-icon icon="heart"></font-awesome-icon>
      </v-flex>
      <v-flex mb-10>
          &copy;2018
          — <strong>varfdeforma.ro</strong>
          — <router-link to="/termeni" class="blue--text">Termeni și Condiții</router-link>
          — Contact: <strong>admin@varfdeforma.ro</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'vdf-footer'
}
</script>

<style scoped>
</style>
