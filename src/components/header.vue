<template>
  <div class="header-wrapper">
     <ul >
         <li>
             <router-link to='/first/first'>first</router-link>
         </li>
         <li>
             <router-link to='/first'>first</router-link>
         </li>
     </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.header-wrapper{
    color: white
}
li{
    float: left;
    list-style: none;
    color: #fff;
}
</style>