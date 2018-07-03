<template>
  <ais-index
    index-name='vdf'
    :search-store='searchStore'>
    <v-app id='vdf'>
      <v-toolbar color='amber' app absolute>
        <span class='title ml-3 mr-5'>Varf De Forma</span>
        <div id='search-box'>
          <ais-search-box></ais-search-box>
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex lg2>
              <v-layout column>
                <h1>Name</h1>
                <ais-refinement-list attribute-name='sport' :class-names="{'ais-refinement-list__count': 'tag'}"></ais-refinement-list>
                <h1>Discipline</h1>
                <ais-refinement-list attribute-name='discipline' :class-names="{'ais-refinement-list__count': 'tag'}"></ais-refinement-list>
              </v-layout>
            </v-flex>
            <v-flex lg10>
              <ais-results>
                <template slot-scope='{ result }'>
                    <event-card :vdfEvent='result'></event-card>
                </template>
              </ais-results>
            </v-flex>
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
              'value': 'Sony - __ais-highlight__PlayStation__/ais-highlight__ 3 The Last of __ais-highlight__Us__/ais-highlight__ Bundle - __ais-highlight__500GB__/ais-highlight__'
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
