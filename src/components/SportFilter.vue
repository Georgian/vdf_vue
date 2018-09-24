<template>
  <!-- TODO This component is giving me a fucking headache. -->
<!--  <div>
    <div>
      <input type="radio" id="radio-1" name="sport" value="All" @click="showOnly('All')" checked="checked">
      <label for="radio-1">Toate</label>
    </div>
    <div>
      <input type="radio" id="radio-2" name="sport" value="All" @click="showOnly('MTB')">
      <label for="radio-2">MTB</label>
    </div>
    <div>
      <input type="radio" id="radio-3" name="sport" value="All" @click="showOnly('Sosea')">
      <label for="radio-3">Sosea</label>
    </div>
    <div>
      <input type="radio" id="radio-4" name="sport" value="All" @click="showOnly('Ciclocross')">
      <label for="radio-4">Ciclocross</label>
    </div>
  </div>-->

<!--<v-btn-toggle v-model="sportToggle">
<v-btn flat value="All"   v-on:click="showOnly('All')">TOATE</v-btn>
<v-btn flat value="MTB"   v-on:click="showOnly('MTB')">MTB</v-btn>
<v-btn flat value="Sosea" v-on:click="showOnly('Sosea')">Sosea</v-btn>
<v-btn flat value="Ciclocross" v-on:click="showOnly('Ciclocross')">Ciclocross</v-btn>
</v-btn-toggle>-->

  <!-- TODO conver to v-for -->
  <v-layout column>
    <v-flex py-0 my-0>
      <v-radio-group v-model="radioGroup" :mandatory="true">
        <v-layout row>
          <v-flex my-0 py-0>
            <v-radio label="Toate"      value="radio-1" v-on:change="showOnly('All')"></v-radio>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex my-0 py-0>
            <v-radio label="MTB"        value="radio-2" v-on:change="showOnly('MTB')"></v-radio>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex my-0 py-0>
            <v-radio label="Sosea"      value="radio-3" v-on:change="showOnly('Sosea')"></v-radio>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex my-0 py-0>
            <v-radio label="Ciclocross" value="radio-4" v-on:change="showOnly('Ciclocross')"></v-radio>
          </v-flex>
        </v-layout>
      </v-radio-group>
    </v-flex>
  </v-layout>
</template>
<script>
import { Component } from 'vue-instantsearch'

export default {
  mixins: [Component],
  data () {
    return {
      radioGroup: 'radio-1'
    }
  },
  methods: {
    showOnly: function (sport) {
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
</script>

<style scoped>
.v-btn-toggle {
  flex-direction: column;
}
</style>
