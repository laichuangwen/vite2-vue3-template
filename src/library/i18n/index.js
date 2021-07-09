import { createI18n } from 'vue-i18n'
import en from './lang/en';
import zh from './lang/zh';

export default ({ Vue }) => {
    const i18n = createI18n({
        locale: 'en', // 语言标识
        messages: {
            zh,
            en,
        },
    })
    Vue.use(i18n)
    Vue.$ctx.i18n = i18n
}
