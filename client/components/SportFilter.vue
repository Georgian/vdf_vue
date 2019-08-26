<template>
  <v-radio-group v-model="radioGroup" :mandatory="true" class="large">
    <v-radio label="Toate" value="radio-1" v-on:change="showOnly('All')"></v-radio>
    <v-radio label="MTB" value="radio-2" v-on:change="showOnly('MTB')"></v-radio>
    <v-radio label="Șosea" value="radio-3" v-on:change="showOnly('Șosea')"></v-radio>
    <v-radio label="Ciclocross" value="radio-4" v-on:change="showOnly('Ciclocross')"></v-radio>
  </v-radio-group>
</template>
<script>
  import {Component} from 'vue-instantsearch'

  export default {
    name: 'vdf-sport-filter',
    mixins: [Component],
    data() {
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
    },
    watch: {
      radioGroup: function (oldRadioGroup, newRadioGroup) {
        console.log(newRadioGroup)
      }
    }
  }
</script>

<style>
  .v-radio .v-label {
    font-size: 14px;
  }
</style>
