<template>
  <div>
    <cell :title="group.name + ' ( ' + group.people.length + ' ) '" @click="togglePeople"></cell>
    <div v-show="showPeople">
      <div v-for="person in people">
        <person-item :nickname="person.nickname" :desc="person.desc" :avatar="person.avatar" @click="openChatRoom(person)"></person-item>
      </div>
    </div>
  </div>
</template>

<script>
  import Cell from 'vux/components/cell'
  import PersonItem from '../PersonItem.vue'

  export default {
    name: 'friend-group',

    components: {
      Cell,
      PersonItem
    },

    data () {
      let people_ids = this.group.people
      for (let index in people_ids) {
        let _id = people_ids[index]
        this.$http.post('/person', {_id: _id}).then(function(res) {
          let data = res.data
          if (data.succ) {
            let person = data.data
            this.people.push(person)
          } else {
            console.log(data.error)
          }
        }, function(err){console.log(err)})
      }
      return {
        people: [],
        showPeople: false
      }
    },

    props: {
      group: Object
    },

    methods: {
      togglePeople () {
        this.showPeople = !this.showPeople
      },
      openChatRoom (person) {
        window.addToChatList(person)
        this.$route.router.go({path: '/chats/' + person._id})
      }
    }

  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
