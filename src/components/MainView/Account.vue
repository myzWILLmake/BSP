<template>
  <div>
    <blur :blur-amount="40" :url="avatarURL">
      <p class="center"><img :src="avatarURL"><br>{{name}}</p>
    </blur>
    <group>
      <cell title="修改个人信息" is-link @click="modifyInfo"></cell>
    </group>
  </div>
</template>

<script>
  import Blur from 'vux/components/blur'
  import Group from 'vux/components/group'
  import Cell from 'vux/components/cell'
  import XButton from 'vux/components/x-button'

  export default {
    name: "account",

    components: {
      Blur,
      Group,
      Cell,
      XButton
    },

    computed: {
      avatarURL () {
        let user = window.user
        return "/assets/img/" + user.avatar + ".jpg"
      },
      name () {
        let user = window.user
        return user.nickname
      }
    },

    methods: {
      modifyInfo () {
        this.$route.router.go({path: '/modify'})
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'

  .center
    text-align center
    padding-top 20px
    color #fff
    font-size 18px

  .center img
    width 100px
    height 100px
    border-radius 50%
    border 4px solid #ececec
</style>
