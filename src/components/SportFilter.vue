<template>
  <div>
      <v-btn-toggle v-model="sportToggle">
        <v-btn flat value="All"   v-on:click="showOnly('All')">TOATE</v-btn>
        <v-btn flat value="MTB"   v-on:click="showOnly('MTB')">MTB</v-btn>
        <v-btn flat value="Sosea" v-on:click="showOnly('Sosea')">Sosea</v-btn>
        <v-btn flat value="Ciclocross" v-on:click="showOnly('Ciclocross')">Ciclocross</v-btn>
      </v-btn-toggle>

    <!--<v-flex py-0 px-0>
     <v-radio-group v-model="radioGroup" :mandatory="true">
       <v-radio label="Toate"      value="radio-1" v-on:change="showOnly('All')"></v-radio>
       <v-radio label="MTB"        value="radio-2" v-on:change="showOnly('MTB')"></v-radio>
       <v-radio label="Sosea"      value="radio-3" v-on:change="showOnly('Sosea')"></v-radio>
       <v-radio label="Ciclocross" value="radio-4" v-on:change="showOnly('Ciclocross')"></v-radio>
     </v-radio-group>
   </v-flex>-->
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

<style scoped>
.v-btn-toggle {
  flex-direction: column;
}
</style>
