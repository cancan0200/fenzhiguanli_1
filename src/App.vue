<template>
  <div>
      <div class="left">
          left
      </div>
      <div class="top">
          <v-header></v-header>
      </div>
      <div class="main">
          main
          <router-view></router-view>
      </div>
  </div>

</template>

<script>
import header from './components/header'
export default {
    components: {
        'v-header': header
    }
}
</script>

<style>
.top {
    position: absolute;
    top: 0;
    left: 0;
    background: #333;
    height: 50px;
    width: 100%
}
.left {
    position: absolute;
    top: 0;
    left: 0;
    background: #333;
    width: 50px;
    height: 400px
}

.main{
    position: absolute;
    top: 50px;
    left: 50px;
    right: 0;
    bottom: 0;
    padding: 30px;
    background: #e5e5ee
}
</style>
