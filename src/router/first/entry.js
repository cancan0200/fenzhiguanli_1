const ENTRY_ROUTES = [
  {
    name: 'first',
    path: '/ers/first/first',
    meta: {
      keepAlive: true,
      headTab: true,
      label: 'first'
    },
    component: () => import('../../pages/first/first.vue')
  },
  {
    name: 'es6',
    path: '/exercise/es6',
    meta: {
      keepAlive: true,
      headTab: true,
      label: 'first'
    },
    component: () => import('../../pages/exercise/es6.vue')
  },
  {
    name: '算法题',
    path: '/exercise/algorithm',
    meta: {
      keepAlive: true,
      headTab: true,
      label: 'first'
    },
    component: () => import('../../pages/exercise/algorithm.vue')
  },
  {
    name: 'css样式',
    path: '/exercise/css',
    meta: {
      keepAlive: true,
      headTab: true,
      label: 'first'
    },
    component: () => import('../../pages/exercise/css.vue')
  },
]

export default ENTRY_ROUTES
