<template>
  <v-content>
    <v-container grid-list-xl>
      <v-layout row wrap>
          <vdf-results></vdf-results>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VdfSportFilter from '~/components/SportFilter'
import VdfMiscFilter from '~/components/MiscFilter'
import VdfResults from '~/components/Results'
import VdfFilter from '~/components/Filter'

export default {
  components: {
    VdfResults,
    VdfMiscFilter,
    VdfSportFilter,
    VdfFilter
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    getMarkerLocation: function (locationCoordinates) {
      let split = locationCoordinates.split(',')
      return { lat: parseFloat(split[0]), lng: parseFloat(split[1]) }
    }
  }
}
</script>

<style>

</style>
