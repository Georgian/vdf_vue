<template>
  <ais-index
    index-name='vdf'
    :search-store='searchStore'>
    <v-app id='vdf'>
      <v-toolbar color='amber' app absolute clipped-left>
        <span class='title ml-3 mr-5'>Varf De Forma</span>
        <div id='search-box'>
          <!-- SearchBox widget will appear here -->
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height class='grey lighten-4'>

          <v-layout row wrap>
            <v-flex d-flex xs12 order-xs5>
              <v-layout column>
                <v-flex d-flex>
                  <h1>Name</h1>
                  <ais-refinement-list attribute-name='sport'></ais-refinement-list>
                </v-flex>
                <v-flex>
                  <h1>Discipline</h1>
                  <ais-refinement-list attribute-name='discipline'></ais-refinement-list>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout justify-center align-center>
            <ais-results>
              <template slot-scope='{ result }'>
                <h2>
                  <ais-highlight :result='result' attribute-name='name'></ais-highlight>
                </h2>
              </template>
            </ais-results>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </ais-index>
</template>

<script>
import { createFromAlgoliaClient } from 'vue-instantsearch'

// const result = {
//   'results': [{
//     'exhaustiveNbHits': true,
//     'hits': [
//       {
//         'name': 'a',
//         '_highlightResult': {
//           'name': 'a'
//         }
//       },
//       {
//         'name': 'b',
//         '_highlightResult': {
//           'name': 'b'
//         }
//       }
//     ],
//     hitsPerPage: 20,
//     index: 'vdf',
//     nbHits: 2,
//     nbPages: 50,
//     page: 0,
//     params: '',
//     processingTimeMS: 1,
//     query: 'a'
//   }]
// }

const result2 = {
  'results': [
    {
      'hits': [
        {
          'name': 'Sony - PlayStation 3 The Last of Us Bundle - 500GB',
          '_highlightResult': {
            'name': {
              'value': 'Sony - __ais-highlight__PlayStation__/ais-highlight__ 3 The Last of __ais-highlight__Us__/ais-highlight__ Bundle - __ais-highlight__500GB__/ais-highlight__',
            }
          }
        }
      ],
      'facets': {
        'sport': {
          'MTB': 1
        }
      },
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
  ]
}

const client = {
  search (requests) {
    return Promise.resolve(result2)
  }
}

const store = createFromAlgoliaClient(client)

// store.addFacet('sport')

export default {
  data: () => ({
    drawer: null,
    searchStore: store
  })
}
</script>

<style>
  #keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }

  .text {
    font-weight: 400;
  }
</style>
