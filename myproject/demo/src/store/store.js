import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: window.localStorage['token']
}

const getters = {
  token: state => state.token
}

export default new Vuex.Store({
  state,
  getters
})