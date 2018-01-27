import Vue from 'vue'
import App from './App'
import ToWa from './components/ToWa'

Vue.config.productionTip = false
Vue.component('ToWa', ToWa)

ToWa.configure({
  ops: [
    { type: 'comparison', value: 'eq', splitter: 'は', how: 'と同じ (==)' },
    { type: 'comparison', value: 'ne', splitter: 'は', how: 'と同じではない (!=)' },
    { type: 'comparison', value: '<', splitter: 'は', how: 'より小さい (<)' },
    { type: 'comparison', value: '>', splitter: 'は', how: 'より大きい (>)' },
    { type: 'logical', value: 'and', splitter: 'かつ', how: '', description: 'すべてを満たす (and)' },
    { type: 'logical', value: 'or', splitter: 'もしくは', how: '', description: 'いずれかを満たす (or)' },
    { type: 'logical', value: 'not', how: 'を除く', description: 'あてはまらない (not)' },
  ],
  cols: [
    { label: 'a', value: { col: ['default', 'a'] } },
    { label: 'b', value: { col: ['table', 'b'] } },
    { label: 'c', value: { col: ['table', 'c'] } },
  ],
  defaultTable: 'default',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
