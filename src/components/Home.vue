<template>
  <ais-index
    index-name='vdf'
    :search-store='searchStore'>
    <v-app id='vdf'>
      <v-toolbar color='primary' height="80px">
        <v-container>
          <v-layout>
            <v-flex>
              <img src='@/assets/logo.png' alt='' style='width:100px;height:40px;'>
            </v-flex>
            <vdf-input />
          </v-layout>
        </v-container>
      </v-toolbar>
      <v-content>
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex lg2 pl-0>
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
                <v-tabs dark>

                  <v-tab ripple>Listă</v-tab>
                  <v-tab-item>
                    <v-layout row wrap>
                      <v-flex v-for="vdfEvent in results" :key="vdfEvent.id" xs4 justify-end>
                        <event-card :vdfEvent=vdfEvent></event-card>
                      </v-flex>
                    </v-layout>
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

      <v-footer height="auto" color="primary" class="text-xs-center">
        <v-card-text class="white--text">
            &copy;2018 — <strong>varfdeforma.ro</strong> — Contact: <strong>admin@varfdeforma.ro</strong>
          </v-card-text>
      </v-footer>

    </v-app>
  </ais-index>
</template>

<script>
import { Store } from 'vue-instantsearch'
import { AlgoliaSearchHelper } from 'algoliasearch-helper'
import axios from 'axios'
import SportFilter from './SportFilter'
import VdfMap from './Map'

var aisResultObject = {
  // 'hits': [
  //   {
  //     'name': 'Sony - PlayStation 3 The Last of Us Bundle - 500GB',
  //     '_highlightResult': {
  //       'name': {
  //         'value': 'Sony - __ais-highlight__PlayStation__/ais-highlight__ 3 The Last of __ais-highlight__Us__/ais-highlight__ Bundle - __ais-highlight__500GB__/ais-highlight__'
  //       }
  //     }
  //   }
  // ],
  // 'facets': {
  //   'sport': {
  //     'MTB': 1
  //   }
  // },
  'nbHits': 1,
  'page': 0,
  'nbPages': 1,
  'hitsPerPage': 20,
  'processingTimeMS': 3,
  'exhaustiveNbHits': true,
  'query': 'playstation4 (500gb) us ',
  'params': 'query=playstation4%20(500gb)%20us%20&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%5D&tagFilters=',
  'index': 'vdf'
}

var result = {
  'results': [ ]
}

const client = {
  search (requests) {
    var requestParams = []

    var facetsArray = requests[0].params.facetFilters
    if (facetsArray != null) {
      facetsArray.forEach(function (singleFacetArray) {
        if (typeof singleFacetArray === 'string' || singleFacetArray instanceof String) {
          var facet = singleFacetArray.split(':')
          requestParams.push(facet[0] + '=' + facet[1])
        } else {
          singleFacetArray.forEach(function (facetAsString) {
            var facet = facetAsString.split(':')
            requestParams.push(facet[0] + '=' + facet[1])
          })
        }
      })
    }

    var query = requests[0].params.query
    if (query) {
      requestParams.push('query=' + query)
    }

    // var requestLink = 'http://varfdeforma.us-east-2.elasticbeanstalk.com/api/event'
    var requestLink = process.env.API_BASE_URL + '/event'
    if (requestParams.length !== 0) {
      requestLink = requestLink + '?'
      requestParams.forEach(function (rp) {
        requestLink = requestLink + '&' + rp
      })
    }

    return axios.get(requestLink).then((r) => {
      var events = r.data

      var facets = {}
      facets.sport = {}
      facets.discipline = {}
      facets.organizer = {}
      facets.sport = {}

      events.forEach(function (e) {
        if (e.sport != null) {
          var currentSportCount = facets.sport[e.sport]
          facets.sport[e.sport] = currentSportCount == null ? 1 : parseInt(currentSportCount) + 1
        }
        if (e.discipline != null) {
          var currentDisciplineCount = facets.discipline[e.discipline]
          facets.discipline[e.discipline] = currentDisciplineCount == null ? 1 : parseInt(currentDisciplineCount) + 1
        }
        if (e.organizer != null) {
          var currentOrganizerCount = facets.organizer[e.organizer]
          facets.organizer[e.organizer] = currentOrganizerCount == null ? 1 : parseInt(currentOrganizerCount) + 1
        }
      })

      aisResultObject.hits = events
      aisResultObject.facets = facets
      result.results.push(aisResultObject)
      return result
    })
  }
}

// const store = createFromAlgoliaClient(client)

const helper = new AlgoliaSearchHelper(client, 'vdf', {
  facets: ['discipline', 'organizer', 'sport']
})

const store = new Store(helper)

export default {
  components: {
    VdfMap,
    SportFilter
  },
  data: () => ({
    drawer: null,
    searchStore: store
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
  background: #fff;
  border: .5px solid #727272;
  color: #727272;
}
</style>
