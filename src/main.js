import Vue from 'vue'
import App from './App'
import ToWa from './components/ToWa'

Vue.config.productionTip = false
Vue.component('ToWa', ToWa)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
