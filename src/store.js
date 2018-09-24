import Vue from 'vue'
import Vuex from 'vuex'
import vdfapi from './vdfapi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    events: []
  },
  getters: {
    events: state => state.events,
    eventsByFacets: state => facets => {
      return state.events.filter(event => {
        let sport = facets.sport
        if (sport && !sport.includes(event.sport)) { return false }

        let discipline = facets.discipline
        if (discipline && !discipline.includes(event.discipline)) { return false }

        let organizer = facets.organizer
        if (organizer && !organizer.includes(event.organizer)) { return false }

        return true
      })
    }
  },
  actions: {
    loadEvents ({ commit }) {
      commit('SET_LOADING', true)
      vdfapi
        .get('/event')
        .then(r => r.data)
        .then(events => {
          commit('SET_EVENTS', events)
          commit('SET_LOADING', false)
        })
    }
  },
  mutations: {
    SET_EVENTS (state, events) {
      state.events = events
    },
    SET_LOADING (state, isLoading) {
      state.isLoading = isLoading
    }
  }
})
