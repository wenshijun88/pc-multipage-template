import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/element-ui'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import {initLocationData} from '@/utils/inits.js'


Vue.config.productionTip = false
initLocationData(window.location.search)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

