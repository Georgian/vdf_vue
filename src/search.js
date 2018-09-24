import { Store } from 'vue-instantsearch'
import { AlgoliaSearchHelper } from 'algoliasearch-helper'
import store from './store'

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

    var events = store.getters.events

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

    return Promise.resolve(result)
  }
}

const helper = new AlgoliaSearchHelper(client, 'vdf', {
  facets: ['discipline', 'organizer', 'sport']
})

const algoliaStore = new Store(helper)

export default algoliaStore
