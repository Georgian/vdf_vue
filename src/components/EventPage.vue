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
            <h2><font-awesome-icon icon="calendar-alt"></font-awesome-icon> {{vdfEventDates}}</h2>
            <h2><font-awesome-icon icon="location-arrow"></font-awesome-icon> {{vdfEvent.locationName}}</h2>
            <a href="https://goo.gl/forms/IUP6RC6D4lfGVyx92" style="text-decoration: none;" class="blue--text" target="_blank">
              <font-awesome-icon icon="heart"></font-awesome-icon> Informații greșite? Contribuie aici
            </a>
          </v-flex>
          <v-flex lg6 md6 hidden-sm-and-down>
            <v-img :src="vdfEvent.photoLink"></v-img>
          </v-flex>
        </v-layout>

        <v-expansion-panel>

          <v-expansion-panel-content value="true">
            <div slot="header">Descriere</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.description)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Traseu</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.tracks)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Categorii</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.ageCategories)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Program</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.schedule)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Taxă</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.registrationTax)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Premii</div>
            <v-card>
              <v-card-text>
                <span v-html="handleEmptyField(vdfEvent.prizes)"></span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Locație</div>
            <vdf-dir-map :vdf-event="vdfEvent"></vdf-dir-map>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Meteo</div>
            <!-- TODO -->
            <!--<weather
              api-key="e1ace13f0da11bcdf6a4c8402808822b"
              title="Vremea"
              :latitude="vdfEvent.locationCoordinates.split(',')[0]"
              longitude="vdfEvent.locationCoordinates.split(',')[1]"
              language="en"
              units="uk">
            </weather>-->
          </v-expansion-panel-content>

        </v-expansion-panel>

      </v-layout>
    </v-container>
</template>

<script>
import vdfapi from '../vdfapi'
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
      vdfapi.get('/event/' + this.vdfEventId)
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
    },
    handleEmptyField: function (field) {
      return field && field !== '' ? field : '<b>Nici o informație</b>'
    }
  }
}
</script>

<style scoped>

</style>
