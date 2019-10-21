<template>
  <div>
    <input v-model='computedArr'></input>
    <button @click="getTargetArr">生成</button>
    {{targetArr}}}

    <button @click="setVuex()">设置VUEX</button>
    <button @click="getVuex()">得到VUEX</button>
    {{isMenu}}

    <input ref="fileUploader" type="file" @change="fileUploadChange()"/>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                computedArr: '[1,3,4,2,5,6,7]',
                targetArr: [],
                isMenu: ''
            }
        },
        methods: {
            fileUploadChange(event) {
                console.log('upload---', this.$refs.fileUploader.files, 'test 远程分支合并代码 master')
            },
            setVuex() {
                this.$store.commit('firstStore/setApplyId', '123456')
                this.isMenu = this.$store.state.firstStore.applyId
            },
            getVuex() {
                this.isMenu = this.$store.state.firstStore.applyId
            },

            getTargetArr() {
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
            }
        }
    }
</script>

<style>

</style>
