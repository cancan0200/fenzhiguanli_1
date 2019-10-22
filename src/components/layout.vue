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
        <div class="exit">退出</div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="menu-wrapper">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
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
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="tabsEditHandle">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name">
              <div class="caseWrapper">
<!--                <div v-if="item.name === '1'">-->
<!--                  一好不好-->
<!--                </div>-->
<!--                <div v-else-if="item.name === '2'">-->
<!--                  二好不好-->
<!--                </div>-->
<!--                <div v-else-if="item.name === '3'">-->
<!--                  <Footer></Footer>-->
<!--                </div>-->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content">
          内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getCertainNode from './../util/utils.js'
  export default {
    name: 'layout',
    data() {
      return{
        editableTabsValue: '',
        editableTabs: [],
        menuList: [
          {
            title: '导航一',
            index: '1',
            children: [
              {
                title: '选项1',
                path: '',
                index: '1-1'
              }
            ]
          },
          {
            title: '导航二',
            index: '2',
            children: [
              {
                title: '选项1',
                index: '2-1'
              },
              {
                title: '选项2',
                index: '2-2'
              }
            ]
          },
          {
            title: '导航三',
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
      menuSelectHandle(index, indexPath) {
        // console.log(index, indexPath)
        const menuItem = {
          title: '选项1' + index,
          name: index
        }
        if(this.editableTabs.indexOf(index) === -1) {

          this.editableTabs.push(this.getMenuItem(index, this.menuList))
          console.log(getCertainNode(index, this.menuList, 'index', 'children'))
        }
        this.editableTabsValue = index
        // console.log(this.editableTabs)
      },

      // 获取menuItem 项
      getMenuItem(value, list,) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].index === value) {
            return list[i]
          }
          if (list[i].children) {
            let targetItem = this.getMenuItem(value, list[i].children)
            if(targetItem){
              return targetItem
            }
          }
        }
        return null;
      },

      // tabs 新增或删除回调
      tabsEditHandle(targetName, action){
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
    padding: 0;
    border: 0;
  }
  .background-top{
    background: #00192F;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    .logo-wrapper{
      display: flex;
      .logo-text{
        color: #fff;
        font-size: 20px;
        line-height: 60px;
      }
    }
    .right-wrapper{
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
