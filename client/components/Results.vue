<template>
  <v-container grid-list-md>
    <v-layout row wrap xs12>
      <v-flex v-if="showGrid" v-for="vdfEvent in results" :key="vdfEvent.id" md4 sm6 xs12>
        <vdf-event-card :vdfEvent=vdfEvent></vdf-event-card>
      </v-flex>
      <v-flex v-if="!showGrid" xs12>
        <vdf-map :vdfEvents="results"></vdf-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {Component} from 'vue-instantsearch'
  import EventCard from './EventCard'
  import VdfMap from './map/VdfMap'

  export default {
    name: 'vdf-results',
    mixins: [Component],
    data: () => ({
      showGrid: true
    }),
    components: {
      'vdf-event-card': EventCard,
      'vdf-map': VdfMap
    },
    created: function created() {
      this.$eventBus.$on('toggleDisplayMode', () => {
        this.showGrid = !this.showGrid
      })
    },
    mounted: function () {
      this.searchStore.start()
    },
    computed: {
      results: function results() {
        return this.searchStore.results
      }
    }
  }
</script>

<style scoped>

</style>
