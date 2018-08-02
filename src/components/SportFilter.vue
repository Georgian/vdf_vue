<template>
  <div>
    <!--<v-flex v-for="sport in allSports()" :key="sport" xs4>-->
      <v-btn-toggle v-model="sportToggle">
        <v-btn flat value="All"   v-on:click="showOnly('All')">TOATE</v-btn>
        <v-btn flat value="MTB"   v-on:click="showOnly('MTB')">MTB</v-btn>
        <v-btn flat value="Sosea" v-on:click="showOnly('Sosea')">Sosea</v-btn>
      </v-btn-toggle>
    <!--</v-flex>-->
  </div>
</template>
<script>
import { Component } from 'vue-instantsearch'

export default {
  data: function () {
    return {
      sportToggle: 'All'
    }
  },
  mixins: [Component],
  computed: {
  },
  methods: {
    showOnly: function (sport) {
      if (sport !== this.sportToggle) {
        this.searchStore.stop()
        this.searchStore.algoliaHelper.removeFacetRefinement('sport')
        if (sport !== 'All') {
          this.searchStore.algoliaHelper.addFacetRefinement('sport', sport)
        }
        this.searchStore.start()
        this.searchStore.refresh()
      }
    }
  }
}
</script>
