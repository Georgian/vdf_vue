<template>
    <v-container>
      <v-card v-if="loadingData">
        Se încarcă...
      </v-card>

      <v-card v-if="error">
        Eroare!
      </v-card>

      <v-layout v-if="vdfEvent" column>
        <v-flex hidden-md-and-up>
          <v-img :src="vdfEvent.photoLink"></v-img>
        </v-flex>
        <v-layout flex align-center justify-center>
          <v-flex lg6 md6>
            <h1>{{vdfEvent.name}}</h1>
            <h2>{{vdfEventDates}}</h2>
            <h2>{{vdfEvent.locationName}}</h2>
          </v-flex>
          <v-flex lg6 md6 hidden-sm-and-down>
            <v-img :src="vdfEvent.photoLink"></v-img>
          </v-flex>
        </v-layout>

        <p><span v-html="vdfEvent.description"></span></p>

        <vdf-dir-map :vdf-event="vdfEvent"></vdf-dir-map>

        <!--<weather
          api-key="e1ace13f0da11bcdf6a4c8402808822b"
          title="Vremea"
          :latitude="vdfEvent.locationCoordinates.split(',')[0]"
          longitude="vdfEvent.locationCoordinates.split(',')[1]"
          language="en"
          units="uk">
        </weather>-->

      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import VdfDirMap from './DirectionsMap'
import VueWeatherWidget from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'

export default {
  name: 'EventPage',
  components: {VdfDirMap, VueWeatherWidget},
  props: ['vdfEventId'],
  data: function () {
    return {
      loadingData: false,
      error: null,
      vdfEvent: null,
      vdfEventDates: null
    }
  },
  created () {
    this.fetchVdfEvent()
  },
  watch: {
    // Call again the method if the route changes
    '$route': 'fetchVdfEvent'
  },
  methods: {
    fetchVdfEvent: function () {
      this.error = this.vdfEvent = null
      this.loadingData = true
      let self = this
      axios.get(process.env.API_BASE_URL + '/event/' + this.vdfEventId)
        .then(response => {
          self.loadingData = false
          self.vdfEvent = response.data
          this.computeEventDates(self.vdfEvent)
        })
        .catch(error => {
          self.error = error.response
        })
    },
    computeEventDates: function (vdfEvent) {
      this.vdfEventDates = this.formatDate(vdfEvent.dateStart, vdfEvent.dateEnd)
    }
  }
}
</script>

<style scoped>

</style>
