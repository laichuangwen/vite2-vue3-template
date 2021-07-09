
import { createStore } from 'vuex'
import user from './user'


export default ({ Vue }, option) => {
   const store = createStore({
        ...option
    })
    store.registerModule('user',user)
    Vue.$ctx.store = store
    Vue.use(store)
}