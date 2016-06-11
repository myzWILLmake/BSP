<template>
  <div>
    <div class="wm-header">
      <x-header :left-options="{showBack: false}">好友<a slot="right" @click="addFriend"><icon name="user-plus"></icon></a></x-header>
    </div>
    <group v-show="requestNum != 0">
      <cell title="新的朋友" @click="checkRequest">
        <div slot="value">
          <span class="new-friend-count">{{requestNum}}</span>
        </div>
      </cell>
    </group>
    <div v-for="group in friends">
      <group>
        <friend-group :group="group"></friend-group>
      </group>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/components/x-header'
  import Group from 'vux/components/group'
  import Cell from 'vux/components/cell'
  import FriendGroup from './FriendGroup.vue'

  import Icon from 'vue-awesome'

  export default {
    name: "contacts",

    components: {
      XHeader,
      Icon,
      Group,
      Cell,
      FriendGroup
    },

    data () {
      return {
        friends: [],
        requestNum: 0
      }
    },

    methods: {
      addFriend () {
        this.$route.router.go({path: '/add/friend'})
      },
      checkRequest() {
        this.$route.router.go({path: '/new/friends'})
      },
      refreshUser() {
        this.$http.post('/user', {_id: window.user._id}).then(function(res) {
          let data = res.data
          if (data.succ) {
            window.user = data.data
            if (window.user.friends != undefined) {
              this.friends = window.user.friends
            }
            if (window.user.request != undefined) {
              this.requestNum = window.user.request.length
            } else {
              this.requestNum = 0
            }
          } else {
            console.log(data.error)
          }

        })
      }
    },


    route: {
      data ({ to }) {
        this.refreshUser()
        return {
          friends: this.friends,
          requestNum: this.requestNum
        }
      }
    }




  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
