import { createLog } from '../../api/log'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  logs: []
}

const mutations = {

  ADD_LOG: (state, data) => {
    state.logs.push(data)
  },
  SET_LOGS: (state, data) => {
    state.logs = data
  }
}

const actions = {

  createLog({ commit }, data) {
    return new Promise((resolve, reject) => {
      createLog(data).then(response => {
        commit('ADD_LOG', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getLogs({ commit }, data) {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
