import Vuex from 'vuex'
import vdfapi from '../plugins/vdfapi'

const today = new Date()
const searchableFields = ['name', 'description', 'discipline', 'organizer', 'locationName']
const strMatches = function (a, b) { return a && a.toLowerCase().includes(b) }
const matchesQuery = function (event, query) { return searchableFields.some(field => strMatches(event[field], query.toLowerCase())) }

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: process.browser ? localStorage.getItem('token') : null,
      isLoading: false,
      events: [],
      user: null
    },
    getters: {
      isAuthenticated (state) {
        return !!state.user
      },
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
      },
      fetchUser ({commit}) {
        return vdfapi
          .get('/me')
          .then(response => {
            commit('SET_USER', response.data.result)
            return response
          })
          .catch(error => {
            commit('RESET_USER')
            return error
          })
      },
      loginUser ({commit}, data) {
        return vdfapi
          .post('/auth/login', data)
          .then(response => {
            commit('SET_USER', response.data.user)
            return response
          })
      },
      signupUser ({commit}, data) {
        return vdfapi
          .post('/auth/signup', data)
          .then(response => {
            commit('SET_USER', response.data.user)
            return response
          })
      },
      resetUser ({commit}) {
        commit('RESET_USER')
        return Promise.resolve()
      }
    },
    mutations: {
      SET_EVENTS(state, events) {
        state.events = events
      },
      SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
      },
      SET_USER (state, data) {
        state.user = data
      },
      RESET_USER (state) {
        state.user = null
      }
    }
  })
}

export default createStore
