import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/element-ui'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'

import "@/components/icon-svg";

/*引入规则工具函数*/
import yyRules from "@pc/utils/rules";
Vue.use(yyRules);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

