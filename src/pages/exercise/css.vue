<template>
  <div class="parent">
    <div class="children">
      dd
    </div>
  </div>
</template>

<script>
  export default {
    name: 'css'
  }
</script>

<style lang="scss" scoped>
  .parent {
    　justify-content:center;
    　align-items:center;
    　display: -webkit-flex;

    .children {
    /*  position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      background: black;*/
    }
  }
</style>
