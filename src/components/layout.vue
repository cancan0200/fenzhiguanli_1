<template>
  <!-- 模板文件-->
  <div>
    <div class="background-top">
      <div class="logo-wrapper">
        <div class="logo-text">XXX项目</div>
      </div>
      <div class="right-wrapper">
        <div class="exit" @click="exit()">退出</div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="menu-wrapper">
        <el-row class="tac">
          <el-col :span="24">
            <!--   :class="[{'menu--folded': isMenuCollapse===false}]"-->
            <el-menu
              :default-active="menuDefault"
              class="el-menu-vertical"
              background-color="#545c64"
              text-color="#fff"
              router
              :collapse="isMenuCollapse"
              active-text-color="#ffd04b"
              @select="menuSelectHandle"
            >
              <el-row class="icon-wrapper row-bg" :style="iconWidth" type="flex" justify="end">
                <el-col>
                  <div class="text-right" @click="toggleMenuClose()">
                    <i class="el-icon-menu"></i>
                  </div>
                </el-col>
              </el-row>
              <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="menuItem in item.children" :key="menuItem.index" :index="menuItem.index">
                  {{menuItem.title}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="main-wrapper">
        <div class="top-wrapper">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
            class="top--tabs mb-0"
            @tab-remove="romoveTabsHandle"
            @tab-click="clickTabsHandle"
          >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name">
              <div class="caseWrapper">

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="layout-main">
          <div class="layout-wrapper">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="isExitModal"
      width="30%"
      center>
      <span>确认退出</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isExitModal = false">取 消</el-button>
        <el-button type="primary" @click="isExitModal = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import getCertainNode from './../util/utils.js'
  import Storage from '../store/Storage'

  export default {
    name: 'layout',
    data () {
      return {
        isExitModal: false,
        isMenuCollapse: false,

        editableTabsValue: '',
        editableTabs: [],

        menuDefault: '1',
        menuList: [
          {
            title: '导航一',
            index: '1',
            children: [
              {
                title: 'first',
                path: '',
                index: '/ers/first/first'
              }
            ]
          },
          {
            title: '练习',
            index: '2',
            children: [
              {
                title: 'es6',
                index: '/exercise/es6'
              },
              {
                title: '选项2',
                index: '2-2'
              }
            ]
          },
          {
            title: 'elementUI',
            index: '3',
            children: [
              {
                title: '选项1',
                index: '3-1'
              },
              {
                title: '选项2',
                index: '3-2'
              }
            ]
          }
        ]
      }
    },
    computed: {
      iconWidth () {
        return !this.isMenuCollapse ? 'width: 300px' : 'width: 63px'
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData(){
        let tabsGet = Storage.sessionGet('cacheTabs');
        this.editableTabs = tabsGet && tabsGet.length > 0 ? tabsGet : []

        let  editableTabsValue = Storage.sessionGet('cacheActiveTabs')
        this.editableTabsValue = editableTabsValue ? editableTabsValue : ''
        this.menuDefault = editableTabsValue ? editableTabsValue : ''
        console.log(editableTabsValue)
      },
      // 菜单选择回调
      // index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
      menuSelectHandle (index, indexPath) {
        console.log(index, this.editableTabs)
        let tabsArr = this.editableTabs.map(item => {
          return item.name
        })

        if (tabsArr.indexOf(index) === -1) {
          let menuItem = getCertainNode(index, this.menuList, 'index', 'children')
          const tabItem = {
            title: menuItem.title,
            name: menuItem.index
          }
          this.editableTabs.push(tabItem)
        }
        this.editableTabsValue = index
        Storage.sessionSet('cacheTabs', this.editableTabs)
        Storage.sessionSet('cacheActiveTabs', this.editableTabsValue)
      },

      // tabs 删除回调
      romoveTabsHandle (targetName) {
        console.log(targetName)
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)

        Storage.sessionSet('cacheTabs', this.editableTabs)
        Storage.sessionSet('cacheActiveTabs', this.editableTabsValue)
      },

      // 点击tabs
      clickTabsHandle (tabItem) {
        if (this.$route.path !== tabItem.name) {
          this.$router.push({
            path: tabItem.name,
          })
          this.menuDefault = tabItem.name
        }
        this.editableTabsValue = tabItem.name
        Storage.sessionSet('cacheActiveTabs', this.editableTabsValue)
      },

      exit () {
        this.isExitModal = true
      },

      toggleMenuClose () {
        this.isMenuCollapse = !this.isMenuCollapse
      }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .background-top {
    background: #00192F;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;

    .logo-wrapper {
      display: flex;

      .logo-text {
        color: #fff;
        font-size: 20px;
        line-height: 60px;
      }
    }

    .right-wrapper {
      display: flex;
      line-height: 60px;
      color: #fff;
      cursor: pointer;
    }
  }

  .content-wrapper {
    display: flex;
    background: #F0F2F5;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    .menu-wrapper {
      /*width: 300px;*/
      background-color: #545C64;
      height: 100%;
      .icon-wrapper {
        border: 0;
        padding: 10px 20px 10px 0;
        background: rgba(67, 74, 80, 0.8);
        i {
          color: #fff;
          font-size: 20px
        }
      }
      .el-menu-vertical{
        height: 100%;
      }
    }

    .main-wrapper {
      width: 100%;
      height: 100%;
      /*padding: 20px 30px;*/
      .top-wrapper{
        .top--tabs{
          background: #fff;
          padding-left: 30px;
          .el-tabs__header{
            margin: 0 !important;
          }
          .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
            background: #F0F2F5 !important;
          }
        }
      }

      .layout-main {
        padding: 20px 30px;
        background: #F0F2F5;
        .layout-wrapper{
          background: #fff;
        }
      }
    }
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
