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
            { eq: ['a', { col: ['table', 'b'] }] },
            { ne: ['a', 1] },
            {
              or: [
                { eq: [{ col: ['table', 'b'] }, { col: ['table', 'c'] }] },
                { ne: [{ col: ['default', 'a'] }, 1] },
              ]
            },
          ]
        }),
      }
    }
  }
</script>

<style>
</style>
