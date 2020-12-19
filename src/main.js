import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import store from 'assets/js/store'
// 引入组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 重置全局样式
import 'assets/css/reset.css'

// 全局引用自定义模板
import VueModule from 'assets/js/components.js'

// 全局事件
import Utils from 'assets/js/utils.js'

// 全局使用
Vue.use(ElementUI)
Vue.use(VueModule)
Vue.config.productionTip = false
Vue.prototype.Utils = Utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
