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
]

export default ENTRY_ROUTES
