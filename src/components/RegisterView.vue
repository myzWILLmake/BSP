<template>
  <div>
    <group title="账户信息">
      <x-input title="邮箱" placeholder="注册邮箱" is-type="email" :value.sync="mail"></x-input>
      <x-input title="密码" placeholder="输入密码" :min="8" max="32" :value.sync="password"></x-input>
      <x-input title="确认" placeholder="确认密码" :min="8" max="32" :equal-with="password"></x-input>
    </group>
    <group title="个人信息">
      <x-input title="昵称" placeholder="输入昵称" :value.sync="nickname"></x-input>
      <x-input title="手机" placeholder="输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="phone"></x-input>
    </group>
    <br />
    <x-button type="primary" @click="doRegister">注册新用户</x-button>
  </div>
</template>

<script>
  import Group from 'vux/components/group'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/x-button'

  export default {

    name: 'Register',

    components: {
      Group,
      XInput,
      XButton
    },

    data () {
      return {
        mail: "",
        password: "",
        nickname: "",
        phone: ""
      }
    },

    methods: {
      doRegister () {
        this.$route.router.go({name: 'login'});
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
