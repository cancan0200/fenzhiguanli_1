const ENTRY_ROUTES = [
    {
        name: 'first',
        path: '/first/first',
        meta: {
            keepAlive: false,
            headTab: true,
            label: 'first'
        },
        component: () => import('../../pages/first/first.vue')
    },
]

export default ENTRY_ROUTES
