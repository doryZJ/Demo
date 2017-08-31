import * as types from '../types'

const state = {
  user: window.localStorage['user'] && JSON.parse(window.localStorage['user'])
}

const getters = {
  user: state => state.user
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}