<template>
  <div>
    <x-header>{{person_id}}</x-header>
    <scroller lock-x>
      <div>
        <div v-for="message in messages" style="overflow: hidden">
          <chat-item :type="message.type" :message="message.text" :id="message.type ? '../../static/assets/tabbar/account.png' : '../../static/assets/tabbar/chats.png'"></chat-item>
        </div>
      </div>
    </scroller>
    <div id="send-div">
      <br />
      <x-input :required="false" :show-clear="false">
        <x-button type="primary" id="send-button">发送</x-button>
      </x-input>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/components/x-header'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/x-button'
  import Divider from 'vux/components/divider'
  import Scroller from 'vux/components/Scroller'

  import ChatItem from './ChatItem.vue'

  export default {

    name: 'room',

    components: {
      XHeader,
      ChatItem,
      XInput,
      XButton,
      Divider,
      Scroller
    },

    data () {
      return {
        id: "",
        person_id: "",
        // type: 0自己 1对面
        messages: [{
          type: 0,
          time: 111,
          text: "你好啊！"
        },{
          type: 1,
          time: 123,
          text: "泥猴！"
        }]
      }
    },

    route: {
      data ({ to }) {
        console.log(to);
        return {
          id: window.user.id,
          person_id: to.params.person_id
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../style.css'

  #send-div
    position absolute
    bottom 0
    width 100%

  #send-button
    margin-left 10px
</style>
