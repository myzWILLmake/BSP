<template>
  <div>
    <scroller lock-x>
      <div>
        <div v-for="item in list" style="margin: 5px; overflow: hidden;">
          <chats-list-item :id="item.id" :name="item.name" :time="item.last" :text="item.message"></chats-list-item>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Panel from 'vux/components/panel'
  import XButton from 'vux/components/x-button'
  import Scroller from 'vux/components/scroller'

  import ChatsListItem from './ChatsListItem.vue'

  export default {

    name: "chats",

    components: {
      Panel,
      XButton,
      Scroller,
      ChatsListItem
    },

    data () {
      return {
        list: [{
          id: '324adsga6',
          name: '小明0',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 23,
          message: 'asdgasdgaawefafsdg'
        },{
          id: '32426',
          name: '小明1',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 10,
          message: 'asdgasdgsasdfdafadfasdgasdfasdfasdfdafs阿迪阿斯的那该死的更那啥的观看死得更快但凡跟爱的发的所发生的噶'
        },{
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },
        {
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },
        {
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },
        {
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },
        {
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },{
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },{
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        },{
          id: '3245s1aq6',
          name: '小明2',
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          last: 99,
          message: 'asdgassaddgasdg'
        }]
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
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
