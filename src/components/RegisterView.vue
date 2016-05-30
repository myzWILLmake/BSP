<template>
  <div>
    <group title="账户信息">
      <x-input title="邮箱" placeholder="注册邮箱" is-type="email" :value.sync="mail"></x-input>
      <x-input title="密码" placeholder="输入密码" :min="8" :max="32" :value.sync="password"></x-input>
      <x-input title="确认" placeholder="确认密码" :min="8" :max="32" :equal-with="password"></x-input>
    </group>
    <group title="个人信息">
      <x-input title="昵称" placeholder="输入昵称" :value.sync="nickname"></x-input>
      <x-input title="手机" placeholder="输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="phone"></x-input>
    </group>

    <group title="选择头像">
      <selector placeholder="请选择头像" :options="list" :value.sync="avatar"></selector>
    </group>

    <br />
    <x-button type="primary" @click="doRegister">注册新用户</x-button>



    <toast :show.sync="showSucc">注册成功<br />前往登录页面...</toast>
    <toast :show.sync="showError" type="warn">{{errorInfo}}</toast>
  </div>
</template>

<script>
  import Group from 'vux/components/group'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/x-button'
  import Toast from 'vux/components/toast'
  import Selector from 'vux/components/selector'

  export default {

    name: 'Register',

    components: {
      Group,
      XInput,
      XButton,
      Toast,
      Selector
    },

    data () {
      return {
        mail: "",
        password: "",
        nickname: "",
        phone: "",
        showSucc: false,
        showError: false,
        errorInfo: "",
        list:['1', '2', '3', '4', '5', '6', '7', '8', '9', "10"],
        avatar: '1'
      }
    },

    methods: {
      doRegister () {
        let user = {
          mail: this.mail,
          password: this.password,
          nickname: this.nickname,
          phone: this.phone,
          avatar: this.avatar,
          unread: new Object()
        }
      this.$http.post('/register', user).then(function(res) {
          let data = res.data
          if (data.succ) {
            this.showSucc = true
            let router = this.$route.router
            setTimeout(function() {
              router.go({name: 'login'})
            }, 1000)
          } else {
            this.errorInfo = "邮箱已被使用"
            this.showError = true
          }
        }, function(err) {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
