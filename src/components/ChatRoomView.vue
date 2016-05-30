<template>
  <div>
    <x-header>{{person.nickname}}</x-header>
    <scroller lock-x>
      <div>
        <div v-for="message in messages" style="overflow: hidden">
          <chat-item :type="message.type" :message="message.text" :id="message.id"></chat-item>
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
  import Scroller from 'vux/components/scroller'

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
        person: {},
        // type: 0自己 1对面
        messages: []
      }
    },

    methods: {
      getMoreMessage: function() {
        let user = window.user
        let person = this.person
        this.$http.post('/message', {user_id: user._id, person_id: person._id}).then(function(res) {
          let data = res.data
          if (data.succ == true) {
            let messageList = data.data
            if (messageList !== undefined) {
              for (let message in messageList) {
                let messageItem = {
                  type: message.from == user._id ? 0 : 1,
                  time: message.time,
                  text: message.content,
                  id: message.from == user._id ? user.avatar : person.avatar
                }
                this.messages.push(messageItem)
              }
            }
          } else {
            console.log(data.error)
          }
        }, function(err){console.log(err)})
      }
    },

    route: {
      data ({ to }) {
        console.log(to);
        let person_id = to.params.person_id
        this.$http.post('/person', {_id: person_id}).then(function(res) {
          let data = res.data
          if (data.succ) {
            let person = data.data
            this.person = {
              _id: person._id,
              nickname: person.nickname,
              avatar: person.avatar
            }
            this.getMoreMessage()
          }
        }, function(err){console.log(err)})
        return {
          person: this.person,
          messages: this.messages
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
