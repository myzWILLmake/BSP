<template>
  <div>
    <div class="wm-header">
      <x-header :left-options="{showBack: false}">{{person.nickname}}</x-header>
    </div>
    <div>
      <br />
      <br />
      <div v-for="message in messages | orderBy 'time'">
        <chat-item :type="message.type" :message="message.text" :id="message.id"></chat-item>
      </div>
      <br />
      <br />
      <br id="bottom-br" />
    </div>
    <div id="send-div">
      <x-input :required="false" :show-clear="false" :value.sync="inputMessage">
        <x-button type="primary" id="send-button" @click="sendMessage">发送</x-button>
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
        inputMessage: "",
        // type: 0自己 1对面
        messages: [],
        init: false
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
              for (let index in messageList) {
                let message = messageList[index]
                let messageItem = {
                  type: message.from == user._id ? 0 : 1,
                  time: new Date(message.time).getTime(),
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
      },
      sendMessage: function() {
        let message = {
          time: new Date().getTime(),
          from: window.user._id,
          to: this.person._id,
          content: this.inputMessage
        }
        socket.emit('send message', message)
        let messageItem = {
          type: 0,
          time: new Date(message.time).getTime(),
          text: message.content,
          id: window.user.avatar
        }
        this.messages.push(messageItem)
        this.scrollToBottom()
      },
      initSocket: function (mod) {
        let socket = window.socket
        socket.on('new message', function(data) {
          let messageItem = {
            type: 1,
            time: new Date(data.time).getTime(),
            text: data.content,
            id: mod.person.avatar
          }
          mod.messages.push(messageItem)
          mod.scollToBottom()
        })
      },
      scrollToBottom () {
        setTimeout(function() {
          let pos = document.getElementById('bottom-br').getBoundingClientRect()
          window.scroll(0,pos.top)
        }, 200)
      }
    },

    route: {
      data ({ to }) {
        this.messages = []
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
        if (this.init == false) {
          this.initSocket(this)
          this.init = true
        }
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
    position fixed
    bottom 0
    width 100%
    background white

  #send-button
    margin-left 10px
</style>
