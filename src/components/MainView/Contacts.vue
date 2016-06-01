<template>
  <div>
    <div class="wm-header">
      <x-header :left-options="{showBack: false}">好友<a slot="right" @click="addFriend"><icon name="user-plus"></icon></a></x-header>
    </div>
    <br />
    <br />
    <search @result-click="resultClick" @on-change="findFriend" :results="searchResults" :value.sync="inputValue"></search>
  </div>
</template>

<script>
  import XHeader from 'vux/components/x-header'
  import Search from 'vux/components/search'
  import Icon from 'vue-awesome'

  export default {
    name: "contacts",

    components: {
      XHeader,
      Search,
      Icon
    },

    data () {
      return {
        searchResults: [],
        inputValue: ''
      }
    },

    methods: {
      addFriend () {
        this.$route.router.go({path: '/add/friend'})
      },
      resultClick (item) {
        alert(JSON.stringify(item))
      },
      findFriend () {
        this.searchResults = [{
          index: 0,
          title: "添加好友: " + this.inputValue
        },{
          index: 1,
          title: this.inputValue + "sacasc"
        },{
          index: 2,
          title: this.inputValue +"asxasf"
        }]
      }
    }




  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
