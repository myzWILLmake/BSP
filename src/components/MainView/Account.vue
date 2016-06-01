<template>
  <div>
    <blur :blur-amount="40" :url="avatarURL">
      <p class="center"><img :src="avatarURL"><br>{{name}}</p>
    </blur>
  </div>
</template>

<script>
  import Blur from 'vux/components/blur'

  export default {
    name: "account",

    components: {
      Blur
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
