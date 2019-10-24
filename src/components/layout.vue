<template>
  <!-- 模板文件-->
  <!--  <el-container>-->
  <!--    <el-aside width="200px">Aside</el-aside>-->
  <!--    <el-container>-->
  <!--      <el-header>Header</el-header>-->
  <!--      <el-main>Main</el-main>-->
  <!--      <el-footer>Footer</el-footer>-->
  <!--    </el-container>-->
  <!--  </el-container>-->
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
            <el-menu
              :default-active="menuDefault"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              router
              active-text-color="#ffd04b"
              @select="menuSelectHandle"
            >
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
        <div class="topWrapper">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
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
        <div class="content">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
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

  export default {
    name: 'layout',
    data () {
      return {
        isExitModal: false,

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
    methods: {
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
      },

      // 点击tabs
      clickTabsHandle (tabItem) {
        if (this.$route.path !== tabItem.name) {
          this.$router.push({
            path: tabItem.name,
          })
          this.menuDefault = tabItem.name
        }
      },

      exit() {
        this.isExitModal = true
      }
    }
  }
</script>

<style lang="scss" scoped>
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

    .menu-wrapper {
      width: 300px;
      background-color: #545C64;
    }

    .main-wrapper {
      width: 100%;
    }

    .content {
      padding: 30px;
      background: #fff;
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
