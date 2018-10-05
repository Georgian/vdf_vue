<template>
  <v-content>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex lg2 pl-0 hidden-md-and-down>
          <v-layout column>

            <v-flex>
              <vdf-misc-filter></vdf-misc-filter>
            </v-flex>

            <v-flex>
              <h3>Sport</h3>
              <vdf-sport-filter></vdf-sport-filter>
            </v-flex>

            <v-flex pb-5>
              <h3>Disciplina</h3>
              <ais-refinement-list attribute-name='discipline' :sort-by="['count:desc', 'name:asc']" inline-template>
                <v-layout column>
                  <v-flex v-for="facet in facetValues" :key="facet.name" my-0 py-0>
                    <v-layout row align-center justify-center fill-height>
                      <v-flex my-0 py-0>
                        <v-checkbox :label=facet.name v-model="facet.isRefined" @change="toggleRefinement(facet)" hide-details></v-checkbox>
                      </v-flex>
                      <div class="badge mt-2">
                        {{ facet.count }}
                      </div>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </ais-refinement-list>
            </v-flex>

            <v-flex pb-5>
              <h3>Etichetă</h3>
              <ais-refinement-list attribute-name='miscellaneous' :sort-by="['count:desc', 'name:asc']" inline-template>
                <v-layout column>
                  <v-flex v-for="facet in facetValues" :key="facet.name" my-0 py-0>
                    <v-layout row align-center justify-center fill-height>
                      <v-flex my-0 py-0>
                        <v-checkbox :label=facet.name v-model="facet.isRefined" @change="toggleRefinement(facet)" hide-details></v-checkbox>
                      </v-flex>
                      <div class="badge mt-2">
                        {{ facet.count }}
                      </div>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </ais-refinement-list>
            </v-flex>

            <v-flex>
              <h3>Organizator</h3>
              <ais-refinement-list attribute-name='organizer' :sort-by="['count:desc', 'name:asc']" inline-template>
                <v-layout column fill-height>
                  <v-flex v-for="facet in facetValues" :key="facet.name" my-0 py-0>
                    <v-layout row align-center justify-center fill-height>
                      <v-flex my-0 py-0>
                        <v-checkbox :label=facet.name v-model="facet.isRefined" @change="toggleRefinement(facet)" hide-details></v-checkbox>
                      </v-flex>
                      <div class="badge mt-2">
                        {{ facet.count }}
                      </div>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </ais-refinement-list>
            </v-flex>

          </v-layout>
        </v-flex>
        <v-flex lg10>
          <vdf-results></vdf-results>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VdfSportFilter from '~/components/SportFilter'
import VdfMiscFilter from '~/components/MiscFilter'
import VdfResults from '~/components/Results'

export default {
  components: {
    VdfResults,
    VdfMiscFilter,
    VdfSportFilter
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
  .v-label {
    font-size: 14px;
  }
  .badge {
    float: right;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: #777;
    border-radius: 8px;
  }
</style>
