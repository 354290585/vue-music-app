import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from 'store/getter'
import mutations from 'store/mutation'
import * as actions from 'store/action'
import state from 'store/state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
