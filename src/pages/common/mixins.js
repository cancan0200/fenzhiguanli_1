/**
 * zhoucan
 * 混入公共方法
 * mixin 引用 test
 */

export const studyMixin = {
  data() {
    return{
      peopleList: []
    }
  },
  created() {

  },
  mounted() {
    // debugger
    // console.log('这是mixin')
    this.getPeopleList()
  },
  methods: {
    getPeopleList() {
      this.peopleList = [1,2,3,4].map(item => {
        return `人名${item}`
      })
    },
    getTestResult() {
      alert('这是test mixmin')
    }
  }
}
