import * as types from './mutation-types'
import config from 'config'

export const module = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    [types.SET_COREMEDIA] (state, payload) {
      state.data = payload
    }
  },
  actions: {
    get ({ commit }) {
      fetch(`${config.coremedia.endpoint}/homegrid/vans-en-gb`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      }).then(res => {
        return res.json()
      }).then(res => {
        commit(types.SET_COREMEDIA, res.data.content)
      })
    }
  },
  getters: {
    data: state => state.data
  }
};
