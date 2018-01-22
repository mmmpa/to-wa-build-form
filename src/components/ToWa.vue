<template lang="pug" >
  section
    h1 {{ operator }}
    h2(v-if="!isLogical") {{ lrOrExes }}
    ToWa(v-if="isLogical", v-for="v in lrOrExes", :v="v")
    .controller(v-if="isLogical")
      button(@click="add") 追加
      select(v-model="addition.operator")
        option(:value="null") (未選択)
        option(v-for="v in OPERATORS", :value="v") {{ v.label }}
</template >


<script >
  const OPERATORS = [
    { type: 'comparison', value: 'eq', label: '等しい' },
    { type: 'comparison', value: 'ne', label: '等しくない' },
    { type: 'comparison', value: '<', label: '大きい' },
    { type: 'comparison', value: '>', label: '小さい' },
    { type: 'logical', value: 'and', label: 'かつ' },
    { type: 'logical', value: 'or', label: 'もしくは' },
    { type: 'logical', value: 'not', label: '除く' },
  ]

  export default {
    props: ['v'],
    data () {
      return {
        addition: {
          operator: null,
          left: null,
          right: null,
        },
      }
    },
    computed: {
      operator () {
        return Object.keys(this.v)[0]
      },
      lrOrExes () {
        return this.v[this.operator]
      },
      isLogical () {
        switch (this.operator) {
          case 'and':
          case 'or':
          case 'not':
            return true
          default:
            return false
        }
      },
      ex () {
        const { operator: { type, value }, left, right } = this.addition

        return type === 'logical'
          ? { [value]: [] }
          : { [value]: [left, right] }
      },
    },
    beforeCreate () {
      this.OPERATORS = OPERATORS
    },
    methods: {
      add () {
        this.lrOrExes.push(this.ex)
      },
    },
  }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .box {
    border: 1px solid #ccc;
  }
</style >
