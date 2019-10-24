<template>
  <!--此页面专用es6学习-->
  <div>
    <el-button type="primary" @click="testArguLocation(1, null)">传入null</el-button>
    <el-button type="primary" @click="testArguLocation(2, undefined)">传入undefined</el-button>
    <el-button type="primary" @click="testSome()">some 方法</el-button>
  </div>
</template>

<script>
  import {ENTRY_API} from '../../api/test/test'

  export default {
    name: 'es6',
    mounted() {
      console.log(ENTRY_API)
      ENTRY_API.guideAdd().then(res => {
        console.log('ss')
      })
    },
    methods: {

      testArguLocation (x, y = 1, c = 0) {
        console.log(x, y, c)
      },
      /*  some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
        some() 方法会依次执行数组的每个元素：
        如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。*/
      testSome () {
        let ages = [1, 10, 20, 30]
        let ageFliter = ages.some(item => {
          return item > 10
        })
        console.log(ageFliter)
      }

    }
  }
</script>

<style scoped>

</style>
