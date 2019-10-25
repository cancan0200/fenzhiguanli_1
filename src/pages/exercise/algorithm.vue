<template>
  <div class="algorithm">
    <!--记录一下写过的算法题-->
    <div class="study-box-wrap">
      <el-button type="primary" @click="getTwoSum()">两数之和</el-button>
      <el-button type="primary" @click="addTwoNumbers()">两数相加</el-button>
      <el-button type="primary" @click="removeDuplicates()">删除排序数组中重复的项</el-button>
      <el-button type="primary" @click="removeElement()">移除元素</el-button>
      <el-button type="primary" @click="combinationSum()">组合总和</el-button>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'algorithm',
    methods: {
      /*
       给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
       你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
       示例:
        给定 nums = [2, 7, 11, 15], target = 9
        因为 nums[0] + nums[1] = 2 + 7 = 9
        所以返回 [0, 1]
       */
      getTwoSum () {
        let nums = [2, 7, 11, 15], target = 9
        var twoSum = function (nums, target) {
          for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
              if (nums[i] + nums[j] == target) {
                return [i, j]
              }
            }
          }
          return [undefined, undefined]
        }
        // var twoSum = function(nums, target) {
        //   for(let i = 0; i < nums.length; i++) {
        //     let taretRemain = target - nums[i]
        //     if(nums.indexOf(taretRemain) != -1 && nums.indexOf(taretRemain) != i){
        //       return [i, nums.indexOf(taretRemain)]
        //     }
        //   }
        //   return [undefined, undefined]
        // };

        console.log(twoSum(nums, target))
      },

      /*给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
        如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
        您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
        示例：
        输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
          输出：7 -> 0 -> 8
          原因：342 + 465 = 807
        */
      addTwoNumbers () {

        function ListNode (val) {
          this.val = val
          this.next = null
        }

        var addTwoNumbers = function (l1, l2) {
          let l1next = l1, l2next = l2
          while (l1next && l2next) {

          }

          // let l1next = l1, l2next = l2
          // let l1Num = '', l2Num = ''
          // console.log(l1, l2)
          // while(l1next) {
          //   l1Num += l1next.val
          //   l1next = l1next.next
          // }
          // l1Num = Number([...l1Num].reverse().join(''))
          //
          // while(l2next) {
          //   l2Num += l2next.val
          //   l2next = l2next.next
          // }
          // l2Num = Number([...l2Num].reverse().join(''))
          //
          // let l3Num = [...(l1Num + l2Num).toString()].reverse()
          //
          // let cache = new ListNode(l3Num[l3Num.length - 1])
          //
          //
          // for(let i = l3Num.length - 1; i >= 0 ;i--){
          //   cache.next = new ListNode(l3Num[i])
          //   cache.val = l3Num[i]
          // }

          // return cache
        }

        //[2,4,3]
        //   [5,6,4]
        let L1 = new ListNode(2)
        L1.next = new ListNode(4)
        L1.next = new ListNode(7)

        let L2 = new ListNode(5)
        L2.next = new ListNode(6)
        L2.next = new ListNode(4)

        console.log(addTwoNumbers(L1, L2))
      },

      //  给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
      //
      // 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

      removeDuplicates () {
        var removeDuplicates = function (nums) {
          let i = 0
          while (i < nums.length) {
            if (nums[i] === nums[i + 1]) {
              nums.splice(i + 1, 1)
            } else {
              i++
            }
          }
          return nums.length
        }

        let testArr = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4]
        console.log(removeDuplicates(testArr))
      },

      /*
            给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
      不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
      元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。*/
      removeElement () {
        var removeElement = function (nums, val) {
          for(let i = nums.length - 1; i >= 0; i--){
            if(nums[i] === val){
              nums.splice(i, 1)
            }
          }
          return nums.length
        }

        let nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
        console.log(removeElement(nums, val))
      },

      // 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
      // candidates 中的数字可以无限制重复被选取。
      combinationSum() {
        var combinationSum = function (candidates, target, mark = 0, addArr = []) {
          if(target < 0){
            return null
          } else if(target === 0){
            return addArr
          } else {
            for(let i = mark; i < candidates.length; i++) {
              if(target < candidates[i]) {
                break
              }
              addArr.push(candidates[i])
              let result = combinationSum(candidates, target - candidates[i], i, addArr)
              if(result) {
                return result
              }
            }
          }
        }

        let candidates = [2,3,6,7], target = 9
        console.log(combinationSum(candidates, target), target)
      }
    }
  }
</script>

<style scoped>

</style>
