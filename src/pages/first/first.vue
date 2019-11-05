<template>
  <div class="study-box-wrap">
    <input v-model='computedArr'></input>
    <button @click="getTargetArr">生成</button>
    {{targetArr}}}

    <button class="mr-10" @click="setVuex()">设置VUEX</button>
    <button @click="getVuex()">得到VUEX</button>
    {{isMenu}}

    <input ref="fileUploader" type="file" @change="fileUploadChange()"/>
    <el-button type="primary" @click="carryingTest()">柯里化</el-button>
    <el-button type="primary" @click="asyncTest()">async await</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        computedArr: '[1,3,4,2,5,6,7]',
        targetArr: [],
        isMenu: ''
      }
    },
    methods: {
      fileUploadChange (event) {
        console.log('upload---', this.$refs.fileUploader.files, 'test 远程分支合并代码 master')
      },
      setVuex () {
        this.$store.commit('firstStore/setApplyId', '123456')
        this.isMenu = this.$store.state.firstStore.applyId
      },
      getVuex () {
        this.isMenu = this.$store.state.firstStore.applyId
      },

      asyncTest() {
       console.log(-0 === +0)
        // function b () {
        //   return new Promise((resolve, reject) => {
        //     console.log('b')
        //   })
        // }
        // function c () {
        //   console.log('c')
        // }
        // const a = () => {
        //   console.log('a')
        //   b().then(() => {
        //     console.log('dd')
        //     c()
        //   }).catch((e) => {
        //     console.log(e)
        //   })
        // };
        //
        // a()
      },

      carryingTest(){

        try {

        } catch (e) {

        }
        // 每月开销函数
        var currying = function (fn) {
          var args = [];
          return function () {
            if(arguments.length === 0){
              return fn.apply(this, args)
            } else {
              [].push.apply(args, arguments);
              return fn.apply(this, args);
            }
          }
        }

        var cost = (function () {
          var money = 0;
          return function () {
            for (var i = 0, l = arguments.length; i < l; i++) {
              money += arguments[i];
            }
            return money;
          }
        })();

        var cost = currying(cost); // 转化成 currying 函数
        cost(100); // 未真正求值
        cost(200); // 未真正求值
        cost(300);   // 未真正求值
        alert(cost());  // 求值并输出：600

      },

      getTargetArr () {
        let computedArr = JSON.parse(this.computedArr)
        let length = computedArr.length
        for (let i = 0; i < length; i++) {
          console.log(computedArr[i], computedArr)
          if (computedArr[i] % 2 === 0) {
            let item = computedArr[i]
            computedArr.push(item)
            if (i !== 0) {
              length--
              computedArr.splice(i, 1)
            }
            console.log(item, computedArr)
          } else {

          }
        }

        this.targetArr = computedArr

        // computedArr.forEach(item => {
        //     if(item % 2 === 0) {
        //         oddArr.push(item)
        //     } else {
        //         evenArr.push(item)
        //     }
        // })
        // this.targetArr = [...evenArr, ...oddArr]
      },
    }
  }
</script>

<style>

</style>
