export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('./view/login/index.vue')
    },
    {
        name: 'forget',
        path: '/forget',
        component: () => import('./view/forget/index.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('./view/register/index.vue')
    },
]
