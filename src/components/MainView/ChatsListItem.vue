<template>
  <div>
    <a @click.prevent="onItemClick(item)" class="weui_media_box weui_media_appmsg">
      <div class="weui_media_hd">
        <img class="weui_media_appmsg_thumb" :src="'/assets/img/' + avatar + '.jpg'">
      </div>
      <div class="weui_media_bd chat-list-item-text">
        <h4 class="weui_media_title">{{name}}</h4>
        <p class="weui_media_desc">{{text}}</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {

    name: 'chats-list-item',

    props: {
      id: String,
      name: String,
      time: Number,
      text: String,
      avatar: String
    },

    methods: {
      onItemClick (e) {
        this.$route.router.go({path: '/chats/' + this.id});
      }
    }

  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
  @import '../../style.css'
</style>
