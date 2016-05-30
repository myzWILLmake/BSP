<template>
  <div>
    <scroller lock-x>
      <div>
        <div v-for="item in list" style="margin: 5px; overflow: hidden;">
          <chats-list-item :id="item._id" :name="item.name" :time="item.last" :text="item.message" :avatar="item.avatar"></chats-list-item>
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
          _id: "574c6bab7ad160b930dc75d4",
          name: "Yunze",
          last: new Date(),
          message: "TEST!",
          avatar: "3"
        }],
        init: false
      }
    },

    methods: {
      initList () {
        let unread = window.user.unread
        if (unread !== undefined) {
          for (let message of unread) {
            this.$http.post('/person', {_id: message.from}).then(function(res) {
              let data = res.data
              if (data.succ) {
                let person = data.data
                this.list.push({
                  _id: person._id,
                  name: person.nickname,
                  last: message.time.getTime(),
                  message: message.content,
                  avatar: person.avatar
                })
              } else {
                console.log(data.error)
              }
            }, function(err) {console.log(err)})
          }
        }
      },

      initSocket () {
        let socket = window.socket
        socket.on('new message', function(data) {
          let message = data
          this.$http.post('/person', {_id: message.from}).then(function(res) {
            let data = res.data
            if (data.succ) {
              let person = data.data
              this.list.push({
                _id: person._id,
                name: person.nickname,
                last: message.time.getTime(),
                message: message.content,
                avatar: person.avatar
              })
            } else {
              console.log(data.error)
            }
          }, function(err) {console.log(err)})
        })
      }

    },

    route: {
      data ({ to }) {
        console.log(to)
        if (this.init == false) {
          console.log("ChatsList!!!!")
          this.initList()
          this.initSocket()
          this.init = true
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
</style>
