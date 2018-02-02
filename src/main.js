import Vue from 'vue'
import App from './App'
import ToWa from './components/ToWa'

Vue.config.productionTip = false
Vue.component('ToWa', ToWa)

ToWa.configure({
  ops: [
    { type: 'comparison', value: 'eq', splitter: 'が', how: 'と同じ (==)' },
    { type: 'comparison', value: 'ne', splitter: 'が', how: 'と同じではない (!=)' },
    { type: 'comparison', value: '<', splitter: 'が', how: 'より小さい (<)' },
    { type: 'comparison', value: '>', splitter: 'が', how: 'より大きい (>)' },
    { type: 'logical', value: 'and', splitter: 'かつ', how: '', description: 'すべてを満たす (and)' },
    { type: 'logical', value: 'or', splitter: 'もしくは', how: '', description: 'いずれかを満たす (or)' },
    { type: 'logical', value: 'not', how: 'を除く', description: 'あてはまらない (not)' },
  ],
  cols: [
    { label: 'カロリー', value: { col: ['default', 'kcal'] } },
    { label: 'タンパク質', value: { col: ['default', 'protein'] } },
    { label: '脂質', value: { col: ['default', 'rapid'] } },
    { label: '炭水化物', value: { col: ['default', 'carbo'] } },
  ],
  defaultTable: 'default',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
