<template>
  <div>
    <div id="logo-div">
      <icon name="weixin" scale="5"></icon>
      <br />
      <p id="logo-text">WeMessage</p>
    </div>
    <group>
      <x-input title="账号" placeholder="请输入登录邮箱" is-type="email" :value.sync="mail" v-ref:mail></x-input>
      <x-input title="密码" placeholder="请输入密码" :min="8" :max="32" :value.sync="password" v-ref:password></x-input>
    </group>
    <group>
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click="login">登录</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click="register">注册</x-button>
        </flexbox-item>
      </flexbox>
    </group>

    <toast :show.sync="showSucc">登录成功</toast>
    <toast :show.sync="showError" type="warn">{{errorInfo}}</toast>
  </div>
</template>

<script>
  import XInput from 'vux/components/x-input'
  import Group from 'vux/components/group'
  import XButton from 'vux/components/x-button'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item'
  import Icon from 'vue-awesome/dist/vue-awesome'
  import Toast from 'vux/components/toast'
  import io from 'socket.io-client'

  export default {

    name: "Login",

    components: {
      XInput,
      Group,
      XButton,
      Flexbox,
      FlexboxItem,
      Icon,
      Toast,
      io
    },

    data () {
      return {
        mail: "",
        password: "",
        showSucc: false,
        showError: false,
        errorInfo: ""
      }
    },

    methods: {
      register () {
        this.$route.router.go({name: "register"});
      },
      login () {
        if (this.valid) {
          let userAuth = {
            mail: this.mail,
            password: this.password
          }
          this.$http.post('/auth', userAuth).then(function(res) {
            console.log(res);
            let data = res.data
            if (data.succ) {
              window.user = data.data
              window.socket = io('http://localhost:10011')
              window.socket.emit('log', {_id: window.user._id})
              this.showSucc = true
              let router = this.$route.router
              setTimeout(function() {
                router.go({path: '/main/chats'});
              }, 1000)
            } else {
              this.errorInfo = data.error
              this.showError = true
            }
          }, function(err) {console.log(err)})

        }

      }
    },

    computed: {
      valid () {
        return this.$refs.mail.valid === true && this.$refs.password.valid === true
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'

  #logo-div
    margin-top 10px
    text-align center
    color #228B22

  #logo-text
    font-size 2em
</style>
