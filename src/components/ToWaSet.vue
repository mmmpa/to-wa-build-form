<template lang="pug">
  .to-wa-ex-set
    .to-wa-logical(v-if="isLogical")
      .to-wa-logical-header
        .to-wa-logical-description {{ description }}
      ToWa(v-for="(v, i) in lrOrExes", :v="v", :key="i")
        .to-wa-ex-logical-op(v-if="lrOrExes.length && i !== lrOrExes.length - 1") {{ splitter }} ({{ operator }})
      .to-wa-add
        .to-wa-add-selector
          select(v-model="addition.operator")
            option(:value="null") (未選択)
            option(v-for="v in ToWa.ops", :value="v") {{ v | label }}
        button.to-wa-add-button(@click="add", :disabled="!isSelected") 追加
    .to-wa-comparison(v-else="isLogical")
      .to-wa-ex-block
        ToWaValue(:v="v", lr="left")
      .to-wa-ex-splitter {{ splitter }}
      .to-wa-ex-block
        ToWaValue(:v="v", lr="right")
      .to-wa-ex-how {{ how }}
    slot
</template>


<script>
  import ToWa from './ToWa'
  import ToWaValue from './ToWaValue'
  import toWaAnalyzer from '../mixins/to-wa-analyzer'

  export default {
    components: { ToWaValue },
    props: ['v'],
    mixins: [toWaAnalyzer('v')],
    data () {
      return {
        addition: {
          operator: null,
        },
      }
    },
    computed: {
      isSelected () {
        return this.addition.operator
      },
      configuration () {
        return ToWa.opsMap[this.operator]
      },
      splitter () {
        return this.configuration.splitter
      },
      description () {
        return this.configuration.description
      },
      how () {
        return this.configuration.how
      },
    },
    methods: {
      add () {
        this.lrOrExes.push(this.ex())
      },
      ex () {
        const {
          operator: { type, value },
        } = this.addition

        return type === 'logical'
          ? { [value]: [] }
          : { [value]: [ToWa.cols[0].value, ''] }
      },
    },
    filters: {
      label (op) {
        const { splitter, how } = op

        if (!splitter) {
          return `A ${how}`
        }

        return how
          ? `A ${splitter} B ${how}`
          : `A ${splitter} B`
      },
    },
  }
</script>
