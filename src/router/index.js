import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 注册路由插件
Vue.use(VueRouter)

export default new VueRouter({
  base: '/cs/', // 增加路由子目录
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})