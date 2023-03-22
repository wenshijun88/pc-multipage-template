import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import app from './modules/app'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  modules: {
    common,
    app
  },
  getters,
  mutations: {
    SET_PATH (state, path) {
      state.path = path
    },
    SET_CUR_ROUTE_NAME (state, name) {
      state.curRouteName = name
    }
  },
  actions: {
    async setPath ({ commit }, path) {
      try {
        commit('SET_PATH', path)
      } catch (err) {
        console.log(err)
      }
    },
    async setCurRouteName ({ commit }, name) {
      try {
        commit('SET_CUR_ROUTE_NAME', name)
      } catch (err) {
        console.log(err)
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
