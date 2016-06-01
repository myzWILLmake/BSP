<template>
  <div>
    <a>
      <div class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" :src="'/assets/img/' + avatar + '.jpg'">
        </div>
        <div class="weui_media_bd chat-list-item-text">
          <h4 class="weui_media_title">{{nickname}}</h4>
          <p class="weui_media_desc">{{desc}}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "person-item",

    props: {
      nickname: String,
      desc: String,
      avatar: String
    }
  }
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
