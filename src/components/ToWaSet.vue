<template lang="pug">
  section
    .ex.logical(v-if="isLogical")
      .header
        .description {{ description }}
      ToWa(v-for="(v, i) in lrOrExes", :v="v", :key="i")
        .ex-logical-op(v-if="lrOrExes.length && i !== lrOrExes.length - 1") {{ splitter }} ({{ operator }})
      .ex-block
        select.form-control(v-model="addition.operator")
          option(:value="null") (未選択)
          option(v-for="v in ToWa.ops", :value="v") {{ v | label }}
      .ex-block
        button.btn.btn-success(@click="add", :disabled="!isSelected") 追加
    .ex(v-else="isLogical")
      .ex-block
        ToWaValue(:v="v", lr="left")
      .ex-splitter {{ splitter }}
      .ex-block
        ToWaValue(:v="v", lr="right")
      .ex-how {{ how }}
    slot
</template>

<style scoped>
  .logical {
    margin-top: 1em;
    border: 1px solid #ccc;
    padding: 1rem;
  }

  .header {
    margin-bottom: -1.75em;
  }

  .description {
    font-size: 0.8em;
    display: inline-block;
    padding: 0 0.25em;
    background: #fff;
    position: relative;
    line-height: 100%;
    top: -1.75rem;
    left: -0.25rem;
  }

  .ex-block {
    display: inline-block;
  }

  .ex-splitter, .ex-how {
    font-size: 0.8em;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    padding: 0 0.5em
  }

  .ex-logical-op {
    margin: 0.5em 0;
    font-size: 0.8em;
  }
</style>


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
