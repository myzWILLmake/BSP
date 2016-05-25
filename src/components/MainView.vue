<template>
  <div>

    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

    <tabbar>
      <tabbar-item selected @click="switchTab('chats')">
        <img slot="icon" src="../../static/assets/tabbar/chats.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item @click="switchTab('contacts')">
        <img slot="icon" src="../../static/assets/tabbar/contacts.png">
        <span slot="label">好友</span>
      </tabbar-item>
      <tabbar-item @click="switchTab('account')">
        <img slot="icon" src="../../static/assets/tabbar/account.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

  import Tabbar from 'vux/components/tabbar'
  import TabbarItem from 'vux/components/tabbar-item'

  export default {

    name: "Main",

    components: {
      Tabbar,
      TabbarItem
    },

    data () {
      return {
        id: "",
        tab: 1
      }
    },

    methods: {
      switchTab (addr) {
        console.log('/main' + '/' + this.id + '/' + addr)
        this.$route.router.go({path: '/main' + '/' + this.id + '/' + addr})
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
