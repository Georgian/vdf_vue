<template>
  <v-tabs color="primary">

    <v-tab ripple id="tab1">Listă</v-tab>
    <v-tab-item>
      <v-container grid-list-md>
        <v-layout row wrap xs12>
          <v-flex v-for="vdfEvent in results" :key="vdfEvent.id" md4 sm6 xs12>
            <vdf-event-card :vdfEvent=vdfEvent></vdf-event-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>

    <v-tab id="tab2">Hartă</v-tab>
    <v-tab-item>
      <vdf-map :vdfEvents="results"></vdf-map>
    </v-tab-item>

  </v-tabs>
</template>

<script>
import { Component } from 'vue-instantsearch'
import EventCard from './EventCard'
import VdfMap from './map/VdfMap'
export default {
  name: 'vdf-results',
  mixins: [Component],
  components: {
    'vdf-event-card': EventCard,
    'vdf-map': VdfMap
  },
  props: {
    stack: {
      type: Boolean,
      default: false,
    },
    resultsPerPage: {
      type: Number,
    },
  },
/*  data: function data() {
    return {
      blockClassName: 'ais-results',
    };
  },*/
  created: function created() {
    this.updateResultsPerPage();
  },
  watch: {
    resultsPerPage: function resultsPerPage() {
      this.updateResultsPerPage();
    },
  },
  methods: {
    updateResultsPerPage: function updateResultsPerPage() {
      if (typeof this.resultsPerPage === 'number' && this.resultsPerPage > 0) {
        this.searchStore.resultsPerPage = this.resultsPerPage;
      }
    },
  },
  computed: {
    results: function results() {
      if (this.stack === false) {
        return this.searchStore.results;
      }

      if (typeof this.stackedResults === 'undefined') {
        this.stackedResults = [];
      }

      if (this.searchStore.page === 1) {
        this.stackedResults = [];
      }

      if (
        this.stackedResults.length === 0 ||
        this.searchStore.results.length === 0
      ) {
        (ref = this.stackedResults).push.apply(ref, this.searchStore.results);
      } else {
        var lastStacked = this.stackedResults[this.stackedResults.length - 1];
        var lastResult = this.searchStore.results[
        this.searchStore.results.length - 1
          ];

        if (lastStacked.objectID !== lastResult.objectID) {
          (ref$1 = this.stackedResults).push.apply(ref$1, this.searchStore.results);
        }
      }

      return this.stackedResults;
      var ref;
      var ref$1;
    },
    show: function show() {
      return this.results.length > 0;
    },
  },
}
</script>

<style scoped>

</style>
