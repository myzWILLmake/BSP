<template>
  <p>{{data}}, {{name}}!</p>
</template>

<script>
  export default {

    name: 'Main',

    data () {
      return {
        data: 'Hello World'
      }
    },

    computed: {
      name () {
        return 'Yunze'
      }
    }

  }
</script>

<style lang="stylus">
</style>
