<template>
  <div class="hello">
    <div class="left">
      left
    </div>
    <div class="top">
      top
    </div>
    <div class="main">
      main
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
  .top {
    position: fixed;
    top: 0;
    left: 0;
    background: #333;
    height: 50px;
    width: 100%
  }

  .left {
    position: fixed;
    top: 0;
    left: 0;
    background: #333;
    width: 50px;
    height: 400px
  }
</style>
