<template>
  <div>
    <h1>{{id}}</id>

    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

    <tabbar>
      <tabbar-item selected @click="switchTab('chats')">
        <img slot="icon" src="../../../static/assets/tabbar/chats.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item @click="switchTab('contacts')">
        <img slot="icon" src="../../../static/assets/tabbar/contacts.png">
        <span slot="label">好友</span>
      </tabbar-item>
      <tabbar-item @click="switchTab('account')">
        <img slot="icon" src="../../../static/assets/tabbar/account.png">
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

    methods: {
      switchTab (addr) {
        this.$route.router.go({path: '/main/' + addr})
      }
    }

  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
