
const CONFIG_KEY = 'user_config'

export default {
    namespaced: true,
    state: {
        lang: 'en',
    },
    mutations: {
        update(state, data) {
            for (const i in data) {
                state.hasOwnProperty(i) && (state[i] = data[i])
                if (i === 'lang') {
                    // 更新语言
                    Vue.$ctx.i18n.global.locale = data[i]

                }
            }
        }
    },
    actions: {
        async init({ commit }) {
            try {
                const data = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}')
                commit('update', data)
            } catch (e) {
                console.error('获取用户配置失败', e)
            }
        },
        update({ commit, state }, { key, value }) {
            if (key && value !== undefined) {
                // 更新状态机数据
                commit('update', { [key]: value })
                // 更新localstorage
                localStorage.setItem(CONFIG_KEY, JSON.stringify(state))
            }
        }
    }
}
