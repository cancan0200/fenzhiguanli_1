
import ENTRY_ROUTES from './first/entry' // 员工关系路由

export default [
//   {
//     name: 'index',
//     path: '/index',
//     component: require('../pages/index.vue').default
//   },
  {
    path: '*',
    component: () => import('../pages/exception/404.vue')
  },
  ...ENTRY_ROUTES, 
]
