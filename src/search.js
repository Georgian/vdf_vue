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
    /**
     * Split string of facets (or array) provided by algolia, and retain the facets
     * in a map, then pass it to our own store.
     */
    var facetsArray = requests[0].params.facetFilters
    var requestParams = {}
    if (facetsArray != null) {
      facetsArray.forEach(function (singleFacetArray) {
        // Some sort of hack because that's how algolia search provides the facet filters.
        if (typeof singleFacetArray === 'string' || singleFacetArray instanceof String) {
          var facet = singleFacetArray.split(':')

          var key = facet[0]
          requestParams[key] = requestParams[key] || []
          requestParams[key].push(facet[1])
        } else {
          singleFacetArray.forEach(function (facetAsString) {
            var facet = facetAsString.split(':')

            var key = facet[0]
            requestParams[key] = requestParams[key] || []
            requestParams[key].push(facet[1])
          })
        }
      })
    }

    /**
     *
     * important bit
     *
     */
    var events = store.getters.eventsByFacets(requestParams)
    /**
     *
     *
     *
     */

    /**
     * Then tell algolia which facets are we showing, and the count of results
     *
     * TODO Maybe gather facets from the request params, if they were provided already
     */
    var facets = {}
    facets.sport = {}
    facets.discipline = {}
    facets.organizer = {}

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
