// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import 'common/style/index.scss'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
// 解决移动端点击 300毫秒延迟
Fastclick.attach(document.body);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})
