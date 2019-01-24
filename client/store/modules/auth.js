import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import vdfapi from '../../plugins/vdfapi'

const defaultState = () => ({
  token: null,
  user: null
})

const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },
  SET_TOKEN: function (state, token) {
    state.token = token
    vdfapi.defaults.headers = { Authorization: 'Bearer ' + token }
  }
}

const actions = {
  nuxtServerInit({ commit }, { req }) {
    try {
      const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("token="))
      if (jwtCookie) {
        let token = jwtCookie.split('=')[1]
        let payload = jwtDecode(token)
        let date = Date.now() / 1000
        if (payload.exp > date) {
          commit('SET_USER', payload)
          commit('SET_TOKEN', token)
        }
      }
    } catch (error) {

    }
  },
  async login({ commit }, loginData) {
    try {
      const { data } = await vdfapi.post('/auth/login', loginData)
      dispatch('loginSuccess', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async loginSuccess({ commit }, token) {
    let payload = jwtDecode(token)
    Cookie.set('token', token, { expires: 1 / 24 * 6 })  // Expire for 6h
    commit('SET_TOKEN', token)
    commit('SET_USER', payload)
  },
  async logout({ commit }) {
    Cookie.remove('token')
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  }
}

const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState;

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
