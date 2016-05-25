<template>
  <div>
    <h1>Hello!</h1>
    <h1>{{id}}</h1>
  </div>
</template>

<script>
  export default {

    name: "Main",

    data () {
      return {
        id: ""
      }
    },

    route: {
      data ({ to }) {
        let id = to.params.user_id;
        return {
          id: id
        }
      }
    }

  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
