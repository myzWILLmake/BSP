<template>
  <div>
    <x-header>修改个人信息</x-header>
    <group title="账户信息">
      <cell title="邮箱" :value="mail"></cell>
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

    <group title="个性签名">
      <x-textarea :max="30" :value.sync="desc"></x-textarea>
    </group>

    <br />
    <x-button type="primary" @click="doModify">确认修改</x-button>

    <toast :show.sync="showSucc">修改成功</toast>
    <toast :show.sync="showError" type="warn">{{errorInfo}}</toast>
  </div>
</template>

<script>
  import Cell from 'vux/components/cell'
  import Group from 'vux/components/group'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/x-button'
  import Toast from 'vux/components/toast'
  import Selector from 'vux/components/selector'
  import XTextarea from 'vux/components/x-textarea'
  import XHeader from 'vux/components/x-header'

  export default {

    name: 'modify',

    components: {
      Cell,
      Group,
      XInput,
      XButton,
      Toast,
      Selector,
      XTextarea,
      XHeader
    },

    data () {
      let person = window.user
      return {
        mail: person.mail,
        password: person.password,
        nickname: person.nickname,
        phone: person.phone,
        showSucc: false,
        showError: false,
        errorInfo: "",
        list:['1', '2', '3', '4', '5', '6', '7', '8', '9', "10"],
        avatar: person.avatar,
        desc: person.desc
      }
    },

    methods: {
      refreshUser() {
        this.$http.post('/user', {_id: window.user._id}).then(function(res) {
          let data = res.data
          if (data.succ) {
            window.user = data.data
          } else {
            console.log(data.error)
          }

        })
      },
      doModify () {
        let person = {
          _id: window.user._id,
          password: this.password,
          nickname: this.nickname,
          phone: this.phone,
          avatar: this.avatar,
          desc: this.desc
        }
      this.$http.post('/modify', person).then(function(res) {
          let data = res.data
          if (data.succ) {
            this.showSucc = true
            this.refreshUser()
          } else {
            this.errorInfo = data.error
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
