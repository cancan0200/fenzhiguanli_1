import Vuex from 'vuex'
import Vue from 'vue'
import firstStore from './modules/first/firstStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true, // 是否带命名方式
  modules: {
    firstStore
  }
})

export default store
