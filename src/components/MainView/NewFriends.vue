<template>
  <div>
    <div class="wm-header">
      <x-header>好友请求</x-header>
    </div>
    <br />
    <br />
    <group>
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
          <x-input title="群组名" :value.sync="newGroupName" :required="false"></x-input>
        </group>
        <group>
          <x-button @click="addNewGroup">添加新群组<x-button>
        </group>
        <group>
          <x-button type="primary" @click="accept">接受</x-button>
          <x-button tyoe="warn" @click="refuse">拒绝</x-button>
        </group>
      </div>
    </popup>

    <toast :show.sync="showSucc">好友请求已处理</toast>
    <toast :show.sync="showError" type="warn">好友请求处理失败</toast>
  </div>
</template>

<script>
  import XHeader from 'vux/components/x-header'
  import Group from 'vux/components/group'
  import XButton from 'vux/components/x-button'
  import Toast from 'vux/components/toast'
  import Popup from 'vux/components/popup'
  import XInput from 'vux/components/x-input'
  import Selector from 'vux/components/selector'

  import PersonItem from '../PersonItem.vue'

  export default {
    name: "new-friends",

    components: {
      XHeader,
      Group,
      XButton,
      Toast,
      Popup,
      PersonItem,
      XInput,
      Selector
    },

    data() {
      return {
        people: [],
        showSucc: false,
        showError: false,
        showPopup: false,
        selectedPerson: {},
        groups: [],
        selectedGroup: '未分组',
        newGroupName: ''
      }
    },

    methods: {
      accept () {
        let user = window.user
        let person = this.selectedPerson
        let data = {
          from: person._id,
          to: user._id,
          groupByFrom: person.group,
          groupByTo: this.selectedGroup
        }
        this.$http.post('/person/friend/accept', data).then(function(res) {
          let data = res.data
          if (data.succ) {
            this.showSucc = true
            this.showPopup = false
          } else {
            this.showError = true
            this.showPopup = false
          }
        }, function(err){console.log(err)})
      },
      refuse () {
        let user = window.user
        let person = this.selectedPerson
        let data = {
          from: person._id,
          to: user._id
        }
        this.$http.post('/person/friend/refuse', data).then(function(res) {
          let data = res.data
          if (data.succ) {
            this.showSucc = true
            this.showPopup = false
          } else {
            this.showError = true
            this.showPopup = false
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
      getPeople () {
        let request = window.user.request
        for (let index in request) {
          let item = request[index]
          this.$http.post('/person', {_id: item.from}).then(function(res) {
            let data = res.data
            if (data.succ) {
              let person = data.data
              person.group = item.groupByFrom
              this.people.push(person)
            } else {
              console.log(data.error)
            }
          })
        }
      }
    },

    route: {
      data ({ to }) {
        this.people = []
        this.getPeople()
        return {
          people: this.people,
          showSucc: this.showSucc,
          showError: this.showError,
          showPopup: this.showPopup,
          selectedPerson: this.selectedPerson
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
