import * as types from './mutation-types'
import config from 'config'
import fetch from 'isomorphic-fetch'

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
    get ({ commit }, params) {
      let siteId = params && params.siteId ? params.siteId : 'thenorthface-en-us';
      fetch(`${config.coremedia.endpoint}/homegrid/${siteId}`, {
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
