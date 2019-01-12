import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'

import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.compact.css';
import 'devextreme/dist/css/dx.darkmoon.compact.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
