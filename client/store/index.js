import Vuex from 'vuex'
import vdfapi from '../plugins/vdfapi'

const today = new Date()
const searchableFields = ['name', 'description', 'discipline', 'organizer', 'locationName']
const strMatches = function (a, b) { return a && a.toLowerCase().includes(b) }
const matchesQuery = function (event, query) { return searchableFields.some(field => strMatches(event[field], query.toLowerCase())) }
const eventsDisplayModesConst = ['grid', 'map']

const createStore = () => {
  return new Vuex.Store({
    state: {
      showDrawer: false,
      isLoading: false,
      events: [],
      eventsDisplayMode: eventsDisplayModesConst[0]
    },
    getters: {
      events: state => state.events,
      eventsByFacets: state => facets => {
        return state.events.filter(event => {
          let showPastEvents = (facets.showPastEvents && facets.showPastEvents[0] === 'true')
          if (!showPastEvents && event.isPastEvent()) {
            return false
          }

          let sports = facets.sport
          if (sports && !sports.some(s => event.tags.map(t => t.category).indexOf(s) >= 0)) {
            return false
          }

          let miscs = facets.miscellaneous
          if (miscs && !miscs.some(s => event.tags.map(t => t.name).indexOf(s) >= 0)) {
            return false
          }

          let disciplines = facets.discipline
          if (disciplines && !disciplines.some(s => event.tags.map(t => t.name).indexOf(s) >= 0)) {
            return false
          }

          let organizer = facets.organizer
          if (organizer && !organizer.includes(event.organizer)) {
            return false
          }

          let query = facets.query
          if (query && !matchesQuery(event, query)) {
            return false
          }

          return true
        })
          .sort(function (a, b) {
            return new Date(a.dateStart) - new Date(b.dateStart)
          })
      }
    },
    actions: {
      switchToNextDisplayMode({commit, state}) {
        let currentDisplayMode = state.eventsDisplayMode
        let idx = eventsDisplayModesConst.indexOf(currentDisplayMode) + 1
        let nextDisplayMode = idx >= eventsDisplayModesConst.length ? eventsDisplayModesConst[0] : eventsDisplayModesConst[idx]
        commit('SET_EVENTS_DISPLAY_MODE', nextDisplayMode)
      },
      showHideDrawer({commit, state}) {
        commit('SET_DRAWER', !state.showDrawer)
      },
      loadEvents({commit}) {
        commit('SET_LOADING', true)
        vdfapi
          .get('/event')
          .then(r => r.data)
          .then(events => {
            events.forEach(e => {
              e.isPastEvent = function () {
                let refDate = e.dateEnd ? e.dateEnd : e.dateStart
                return new Date(refDate) < today
              }
            })

            commit('SET_EVENTS', events)
            commit('SET_LOADING', false)
          })
      }
    },
    mutations: {
      SET_EVENTS(state, events) {
        state.events = events
      },
      SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
      },
      SET_DRAWER(state, showDrawer) {
        state.showDrawer = showDrawer
      },
      SET_EVENTS_DISPLAY_MODE(state, eventsDisplayMode) {
        state.eventsDisplayMode = eventsDisplayMode
      }
    }
  })
}

export default createStore