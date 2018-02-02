<template lang="pug">
  .to-wa-value-selector(v-if="isLeft")
    .to-wa-type-selector
      label.to-wa-type-selector-label 項目
    .to-wa-value-input
      select(v-model="value")
        option(:value="null") (未選択)
        option(v-for="v in ToWa.cols", :value="v.value") {{ v.label }}
  .to-wa-value-selector(v-else)
    .to-wa-type-selector
      label.to-type-selector-wa-label
        input(type="radio", :checked="isValue", @click="toValue")
        | 値
      label.to-type-selector-wa-label
        input(type="radio", :checked="isCol", @click="toColumn")
        | 項目
    .to-wa-value-input
      input(type="text", v-if="isValue", v-model="value")
      select(v-if="isCol", v-model="value")
        option(:value="null") (未選択)
        option(v-for="v in ToWa.cols", :value="v.value") {{ v.label }}
</template>

<script>
  import Vue from 'vue'
  import ToWa from '../components/ToWa'
  import toWaAnalyzer from '../mixins/to-wa-analyzer'

  export default {
    props: ['v', 'lr'],
    mixins: [toWaAnalyzer('v')],
    watch: {
      '$props.v': {
        deep: true,
        handler: function (v) {
          console.log('watch', v)
        },
      },
    },
    computed: {
      isLeft () {
        return this.lr === 'left'
      },
      isCol () {
        return this.isLeft || !this.isValue
      },
      isValue () {
        return this.value.constructor !== Object
      },
      detail () {
        return Object.keys(this.value)[0]
      },
      detailValue () {
        return this.value[this.detail]
      },
      value: {
        get: function () {
          return this.isLeft
            ? this.lrOrExes[0]
            : this.lrOrExes[1]
        },
        set: function (v) {
          this.isLeft
            ? Vue.set(this.lrOrExes, 0, v)
            : Vue.set(this.lrOrExes, 1, v)
        },
      },
    },
    methods: {
      toValue () {
        console.log('toValue')
        if (this.isValue) {
          return
        }
        this.value = ''
      },
      toColumn () {
        console.log('toColumn')
        if (this.isCol) {
          return
        }
        this.value = ToWa.cols[0].value
      },
    }
  }
</script>
