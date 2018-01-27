<template lang="pug">
  .value-selector(v-if="isLeft")
    .type-selector
      label 項目
    .value-input
      select.form-control(v-model="value")
        option(:value="null") (未選択)
        option(v-for="v in ToWa.cols", :value="v.value") {{ v.label }}
  .value-selector(v-else)
    .type-selector
      label
        input(type="radio", :checked="isValue", @click="toValue")
        | 値
      label
        input(type="radio", :checked="isCol", @click="toColumn")
        | 項目
    .value-input
      input.form-control(v-if="isValue", v-model="value")
      select.form-control(v-if="isCol", v-model="value")
        option(:value="null") (未選択)
        option(v-for="v in ToWa.cols", :value="v.value") {{ v.label }}
</template>

<style scoped>
  .type-selector {
    vertical-align: middle;
    display: inline-block;
    margin-right: -1px;
    height: 40px;
    overflow: hidden;
    line-height: 40px;
    font-size: 0.8em;
    border: 1px solid #d6e1e5;
    border-radius: 3px 0 0 3px;
    padding: 0 0.5em;
    background: #f3f3f3;
  }

  .type-selector label {
    padding: 0.5em
  }

  .value-input select, .value-input input {
    border-radius: 0 3px 3px 0 !important;
    min-width: 200px;
  }

  .value-input {
    display: inline-block;
  }

  .header {
    margin-bottom: -1.75em;
  }

  .description {
    display: inline-block;
    padding: 0 0.25em;
    background: #fff;
    position: relative;
    line-height: 100%;
    top: -1.75em;
    left: -0.25em;
  }

  .ex-block {
    display: inline-block;
  }
</style>


<script>
  import Vue from 'vue'
  import ToWa from '../components/ToWa'
  import toWaAnalyzer from '../mixins/to-wa-analyzer'

  export default {
    props: ['v', 'lr'],
    mixins: [toWaAnalyzer('v')],
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
        if (this.isValue) {
          return
        }
        this.value = ''
      },
      toColumn () {
        if (this.isCol) {
          return
        }
        this.value = ToWa.cols[0].value
      },
    }
  }
</script>
