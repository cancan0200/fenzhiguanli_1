<template>
  <!--此页面专用es6学习-->
  <div>
    <div class="study-box-wrap">
      <el-button type="primary" @click="testArguLocation(1, null)">传入null</el-button>
      <el-button type="primary" @click="testArguLocation(2, undefined)">传入undefined</el-button>
      <el-button type="primary" @click="testSome()">some 方法</el-button>
      <el-button type="primary" @click="handleExcelImport()">导入</el-button>
      <el-button type="primary" @click="promiseTest('all')">Promise all 方法</el-button>
      <el-button type="primary" @click="promiseTest('race')">Promise race 方法</el-button>
      <el-button type="primary" @click="handlePromiseTest()">Promise</el-button>
      <el-button type="primary" @click="axiosFengzhuangTest()">代理</el-button>
    </div>
    <div class="study-box-wrap mt-10">
      <el-row class="mt-10">
        <div v-for="(newItem, index) in newsList" :key="index" class="text-item text-gray">
          {{newItem.title}}
        </div>
      </el-row>
<!--      <el-row class="mt-10">-->
<!--        <div v-for="(peopleItem, index) in peopleList" :key="index" class="text-item text-gray">-->
<!--          {{peopleItem}}-->
<!--        </div>-->
<!--      </el-row>-->
<!--      <div id="log"></div>-->
    </div>
    <div class=" mt-10">
      <div class="study-panel__wrapper">
        <div class="panel__header">
          <div class="panel__title">symbol</div>
        </div>
        <div class="panel__content">content</div>
      </div>
    </div>

    <!-- 文件上传 -->
    <form id="accessExcelForm">
      <input id="accessExcel" ref="accessExcel" hidden type="file" name="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="handleFileChange($event)"/>
    </form>
  </div>
</template>

<script>
  import {ENTRY_API} from '../../api/test/test'
  import {importPositionAdjustmentPersonInfo} from '../../api/positionApi'
  import {studyMixin} from './../common/mixins'

  export default {
    name: 'es6',
    mixins: [studyMixin],
    data() {
      return {
        newsList: []
      }
    },
    mounted () {
      console.log(this.peopleList)
    },
    methods: {
      axiosFengzhuangTest() {
        this.getTestResult()
        let params = {
          name: 'test'
        }
        importPositionAdjustmentPersonInfo(params).then(res => {
          console.log(res)
          this.newsList = res.data
          if(this.resSuccess(res)){
            console.log(res)
          }
        }).catch(err => {
          console.error('err', err)
        })
      },
      handlePromiseTest() {
        var promiseCount = 0;
        function testPromise() {

          let thisPromiseCount = ++promiseCount;

          let log = document.getElementById('log');
          log.insertAdjacentHTML('beforeend', thisPromiseCount +
            ') 开始 (<small>同步代码开始</small>)<br/>');

          // 新构建一个 Promise 实例：使用Promise实现每过一段时间给计数器加一的过程，每段时间间隔为1~3秒不等
          let p1 = new Promise(
            // resolver 函数在 Promise 成功或失败时都可能被调用
            (resolve, reject) => {
              log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise 开始 (<small>异步代码开始</small>)<br/>');
              // 创建一个异步调用
              window.setTimeout(
                function() {
                  // 填充 Promise
                  resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
            }
          );

          // Promise 不论成功或失败都会调用 then
          // catch() 只有当 promise 失败时才会调用
          p1.then(
            // 记录填充值
            function(val) {
              log.insertAdjacentHTML('beforeend', val +
                ') Promise 已填充完毕 (<small>异步代码结束</small>)<br/>');
            })
            .catch(
              // 记录失败原因
              (reason) => {
                console.log('处理失败的 promise ('+reason+')');
              });

          log.insertAdjacentHTML('beforeend', thisPromiseCount +
            ') Promise made (<small>同步代码结束</small>)<br/>');
        }

        testPromise()
      },
      promiseTest(type){
        let p1 = new Promise(function (resolve, reject) {
          setTimeout(resolve, 500, 'P1');
        });
        let p2 = new Promise(function (resolve, reject) {
          setTimeout(resolve, 600, 'P2');
        });


        switch(type){
          case 'all': {
            Promise.all([p1, p2]).then(function (results) {
              console.log(results); // 获得一个Array: ['P1', 'P2']
            });
            break;
          }
          case 'race': {
            Promise.race([p1, p2]).then(function (results) {
              console.log(results);
            });
            break;
          }
        }

      },
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
      },
      handleExcelImport() {
        let accessExcel = this.$refs['accessExcel']
        accessExcel.click()
      },
      handleFileChange(event) {
        let files = event.target.files
        const fileObj = files[0]
        const formData = new FormData() // FormData 对象
        formData.append('file', fileObj) // 文件对象
        // formData.append('ff', '123') // 文件对象
        console.log(fileObj, formData)
        ENTRY_API.guideAdd(formData).then(res => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
