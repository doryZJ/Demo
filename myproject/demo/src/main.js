// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import VueValidator from 'vue-validator'
import App from './App'
import './assets/style/animate.css'
import 'element-ui/lib/theme-default/index.css'
import Toast from './plugins/toast/toast'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueValidator)
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
