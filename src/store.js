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
    events: state => state.events
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
