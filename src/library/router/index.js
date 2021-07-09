import { createRouter, createWebHistory } from 'vue-router'
import routerList from '../../router.js';
export default async ({ Vue }) => {
    const router = createRouter({
        history: createWebHistory(),
        routes: routerList
    })
    Vue.use(router)
    Vue.$ctx.router = router
}