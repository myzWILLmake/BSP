<template>
  <div>
  <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
</script>

<style lang="stylus">
  @import '~vux/vux.css'
</style>
