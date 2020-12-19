import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('store/', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  modules: modules
})
