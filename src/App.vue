<template lang="pug">
  .container
    ToWa(:v="data")
    pre.code {{ code }}
</template>

<script>
  import ToWa from './components/ToWa'

  export default {
    name: 'App',
    computed: {
      code () {
        return JSON.stringify(ToWa.normalize(this.data))
      },
    },
    data () {
      return {
        data: ToWa.prepare({
          and: [
            { '<': ['kcal', 100] },
            { '>': ['protein', 10] },
            {
              or: [
                { '<': ['carbo', { col: ['default', 'protein'] }] },
                { '<': ['rapid', 5] },
              ]
            },
          ]
        }),
      }
    }
  }
</script>
