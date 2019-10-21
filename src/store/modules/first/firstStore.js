const state = {
  applyId: '' // 员工待入职ID
}

const getters = {}

const actions = {
  setApplyId({commit}, data) {
    commit('setApplyId', data)
  }
}

const mutations = {
  setApplyId(state, data) {
    state.applyId = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
