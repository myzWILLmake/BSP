<template>
  <div>
    <panel :list="list | orderBy 'time' " :type="type"></panel>
    <x-button @click="test">测试</x-button>
  </div>
</template>

<script>
  import Panel from 'vux/components/panel'
  import XButton from 'vux/components/x-button'

  export default {

    name: "chats",

    components: {
      Panel,
      XButton
    },

    data () {
      return {
        type: '1',
        list: []
      }
    },

    methods: {
      test () {
        let w = {
          id: '32456',
          name: '小明',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgasdgasdg'
        }
        let x = {
          src: w.avatar,
          title: w.name,
          time: w.last,
          desc: w.message,
          url: w.id
        }
        this.list.push(x)
      }
    },

    events: {
      'on-click-item' (e) {
        this.$route.router.go({
          path: '/chats/' + e.url,
          params: {
            person_id: e.url
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
