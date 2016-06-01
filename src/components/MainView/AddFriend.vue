<template>
  <div>
    <div class="wm-header">
      <x-header>添加好友</x-header>
    </div>
    <br />
    <br />
    <group title="用户信息">
      <x-input title="昵称" :value.sync="nickname"></x-input>
    </group>
    <group>
      <x-button type="primary" @click="getPeople">搜索</x-button>
    </group>
    <group title="搜索结果">
      <div v-show="showEmpty">
        <divider>搜索结果为空</divider>
      </div>
      <div v-for="person in people">
        <person-item @click="selectPerson(person)" :nickname="person.nickname" :desc="person.desc" :avatar="person.avatar"></person-item>
      </div>
    </group>

    <popup :show.sync="showPopup">
      <div>
        <group title="选择群组">
          <selector title="群组名" :options="groups" :value.sync="selectedGroup"></selector>
        </group>
        <group title="或者新建群组">
          <x-input title="群组名" :value.sync="newGroupName"></x-input>
        </group>
        <group>
          <x-button @click="addNewGroup">添加新群组</x-button>
          <x-button type="primary" @click="friendRequest">申请好友</x-button>
        </group>
      </div>
    </popup>

    <toast :show.sync="showSucc">好友请求已发送</toast>
    <toast :show.sync="showError" type="warn">好友请求失败</toast>
  </div>
</template>

<script>
  import XHeader from 'vux/components/x-header'
  import Group from 'vux/components/group'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/x-button'
  import Toast from 'vux/components/toast'
  import Divider from 'vux/components/divider'
  import Popup from 'vux/components/popup'
  import Selector from 'vux/components/selector'

  import PersonItem from '../PersonItem.vue'


  export default {
    name: "add-friend",

    components: {
      Popup,
      XHeader,
      Group,
      XInput,
      XButton,
      Toast,
      Divider,
      Selector,
      PersonItem
    },

    data () {
      return {
        nickname: "",
        people: [],
        showSucc: false,
        showError: false,
        showEmpty: false,
        showPopup: false,
        selectedPerson: {},
        groups: [],
        selectedGroup: '未分组',
        newGroupName: ''
      }
    },

    methods: {
      getPeople () {
        this.$http.post('/person/nickname', {nickname: this.nickname}).then(function(res) {
          let data = res.data
          if (data.succ) {
            let people = data.data
            this.people = people
            if (this.people.length == 0) {
              this.showEmpty = true
            } else {
              this.showEmpty = false
            }
          } else {
            console.log(data.error)
          }
        }, function(err){console.log(err)})
      },
      selectPerson (person) {
        this.selectedPerson = person
        this.showPopup = true
        this.refreshGroups()
      },
      refreshGroups () {
        let groupsName = []
        let friends = window.user.friends
        if (friends !== undefined && friends.length > 0) {
          for (let index in friends) {
            groupsName.push(friends[index].name)
          }
        } else {
          groupsName.push('未分组')
        }
        this.groups = groupsName
      },
      addNewGroup () {
        this.groups.push(this.newGroupName)
        this.newGroupName = ''
      },
      friendRequest () {
        let user = window.user
        let person = this.selectedPerson
        this.$http.post('/person/friend', {from: user._id, to:person._id, group: this.selectedGroup}).then(function(res) {
          let data = res.data
          if (data.succ) {
            this.showSucc = true
            this.showPopup = false
          } else {
            this.showError = true
            this.showPopup = false
          }
        }, function(err){console.log(err)})
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
