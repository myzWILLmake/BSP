<template>
  <div>
    <div class="wm-header">
      <x-header :left-options="{showBack: false}">WeMessage</x-header>
    </div>
    <br />
    <br />
    <div v-for="item in list | orderBy 'last' -1" style="margin: 5px">
      <chats-list-item :id="item._id" :name="item.name" :time="item.last" :text="item.message" :avatar="item.avatar"></chats-list-item>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
  import Panel from 'vux/components/panel'
  import XButton from 'vux/components/x-button'
  import Scroller from 'vux/components/scroller'
  import XHeader from 'vux/components/x-header'

  import ChatsListItem from './ChatsListItem.vue'

  export default {

    name: "chats",

    components: {
      Panel,
      XButton,
      Scroller,
      ChatsListItem,
      XHeader
    },

    data () {
      return {
        list: [],
        init: false
      }
    },

    methods: {
      initList () {
        let unread = window.user.unread
        if (unread !== undefined) {
          let updateUnread = function(i, mod) {
            let message = unread[i]
            mod.$http.post('/person', {_id: message.from}).then(function(res) {
              let data = res.data
              if (data.succ) {
                let person = data.data
                let index = mod.findIndex(person._id)
                if (index == -1) {
                  mod.list.push({
                    _id: person._id,
                    name: person.nickname,
                    last: new Date(message.time).getTime(),
                    message: message.content,
                    avatar: person.avatar
                  })
                } else {
                  mod.list.$set(index, {
                    _id: person._id,
                    name: person.nickname,
                    last: new Date(message.time).getTime(),
                    message: message.content,
                    avatar: person.avatar
                  })
                }
              } else {
                console.log(data.error)
              }
            }, function(err) {console.log(err)})
          }
          for (let index in unread) {
            console.log('lettest!', unread[index])
            updateUnread(index, this)
          }
        }
      },

      initSocket (mod) {
        let socket = window.socket
        socket.on('new message', function(data) {
          let message = data
          mod.$http.post('/person', {_id: message.from}).then(function(res) {
            let data = res.data
            if (data.succ) {
              let person = data.data
              let index = mod.findIndex(person._id)
              if (index == -1) {
                mod.list.push({
                  _id: person._id,
                  name: person.nickname,
                  last: new Date(message.time).getTime(),
                  message: message.content,
                  avatar: person.avatar
                })
              } else {
                mod.list.$set(index, {
                  _id: person._id,
                  name: person.nickname,
                  last: new Date(message.time).getTime(),
                  message: message.content,
                  avatar: person.avatar
                })
              }
            } else {
              console.log(data.error)
            }
          }, function(err) {console.log(err)})
        })
      },

      findIndex(_id) {
        for (let index in this.list) {
          let item = this.list[index]
          if (item._id == _id) {
            return index
          }
        }
        return -1
      },

      addToList(person) {
        let index = this.findIndex(person._id)
        if (index == -1) {
          this.list.push({
            _id: person._id,
            name: person.nickname,
            last: new Date().getTime(),
            message: " ",
            avatar: person.avatar
          })
        } else {
          this.list.$set(index, {
            _id: person._id,
            name: person.nickname,
            last: new Date().getTime(),
            message: " ",
            avatar: person.avatar
          })
        }
      }

    },

    route: {
      data ({ to }) {
        console.log(to)
        if (this.init == false) {
          console.log("ChatsList!!!!")
          this.initList()
          this.initSocket(this)
          this.init = true
          window.addToChatList = this.addToList
        }
        return {
          list: this.list,
          init: this.init
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
