import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import vdfapi from '../../plugins/vdfapi'

const state = () => ({
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

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
