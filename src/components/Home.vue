<template>
  <v-content>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex lg2 pl-0 hidden-md-and-down>
          <v-layout column>

            <v-flex>
              <h1>Sport</h1>
              <sport-filter></sport-filter>
            </v-flex>

            <v-flex>
              <h1>Disciplina</h1>
              <ais-refinement-list attribute-name='discipline'
                                   :sort-by="['count:desc', 'name:asc']">
              </ais-refinement-list>
            </v-flex>

            <v-flex>
              <h1>Organizator</h1>
              <ais-refinement-list attribute-name='organizer'
                                   :sort-by="['count:desc', 'name:asc']">
              </ais-refinement-list>
            </v-flex>

          </v-layout>
        </v-flex>
        <v-flex lg10>
          <ais-results inline-template>
            <v-tabs color="primary">

              <v-tab ripple>Listă</v-tab>
              <v-tab-item>
                <v-container row wrap>
                  <v-layout>
                    <v-flex v-for="vdfEvent in results" :key="vdfEvent.id" md4 sm6 xs12>
                      <event-card :vdfEvent=vdfEvent></event-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>

              <v-tab>Hartă</v-tab>
              <v-tab-item>
                <vdf-map :vdfEvents="results"></vdf-map>
              </v-tab-item>

            </v-tabs>
          </ais-results>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import SportFilter from './SportFilter'
import VdfMap from './Map'
import VdfHeader from './Header'
import VdfFooter from './Footer'

export default {
  components: {
    VdfFooter,
    VdfHeader,
    VdfMap,
    SportFilter
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    getMarkerLocation: function (locationCoordinates) {
      let split = locationCoordinates.split(',')
      return {lat: parseFloat(split[0]), lng: parseFloat(split[1])}
    }
  }
}
</script>

<style>
.ais-refinement-list__checkbox {
  margin-right: 5px;
}
.ais-refinement-list__count {
  color: #8860D0;
}
</style>
