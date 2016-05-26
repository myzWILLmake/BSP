<template>
  <div class="chat_item" :style="type ? orientL : orientR">
    <img :src="id" class="chat_item_img"></img>
    <div class="chat_item_message" :style="type ? colorL : colorR">
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      message: String,
      id: String,
      type: Number
    },

    data () {
      return {
        orientL: {
          flexDirection: 'row-reverse'
        },
        orientR: {
          flexDirection: 'row'
        },
        colorL: {
          background: '#F5F5F5'
        },
        colorR: {
          background: '#90DF90'
        }
      }
    }
  }
</script>
