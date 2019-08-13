<template>
  <v-container grid-list-md>
    <v-layout row wrap xs12>
      <v-flex v-if="displayMode === 'grid'" v-for="vdfEvent in results" :key="vdfEvent.id" md4 sm6 xs12>
        <vdf-event-card :vdfEvent=vdfEvent></vdf-event-card>
      </v-flex>
      <v-flex v-if="displayMode === 'map'" xs12>
        <vdf-map :vdfEvents="results"></vdf-map>
      </v-flex>
      <v-flex v-if="displayMode === 'calendar'" xs12>
        <vdf-calendar :vdfEvents="results"></vdf-calendar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Component } from 'vue-instantsearch'
import EventCard from './EventCard'
import VdfMap from './map/VdfMap'
import VdfCalendar from './Calendar'
export default {
  name: 'vdf-results',
  mixins: [Component],
  data: () => ({
    showGrid: true,
    displayMode: 'grid' // options: [grid, map, calendar]
  }),
  components: {
    'vdf-event-card': EventCard,
    'vdf-map': VdfMap,
    'vdf-calendar': VdfCalendar
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
  created: function created() {
    this.updateResultsPerPage();
    this.$eventBus.$on('toggleDisplayMode', () => {
      if (this.displayMode === 'grid')
        this.displayMode = 'map'
      else if (this.displayMode === 'map')
        this.displayMode = 'calendar'
      else if (this.displayMode === 'calendar')
        this.displayMode = 'grid'
    })
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
