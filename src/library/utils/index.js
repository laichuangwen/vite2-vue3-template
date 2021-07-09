

import Cookie from './cookie'
import AES from './aes';
import parser from './parser';
import moment from 'moment'
import SessionStorage from './sessionStorage'
import LocalStorage from './localStorage'

class Util {
    constructor(option) {
        Object.assign(this, {
            AES: AES,
            moment:moment,
            parser:parser,
            cookie: new Cookie(option),
            sessionStorage: new SessionStorage(option),
            localStorage: new LocalStorage(option)
        })
    }
}

export default ({ Vue }, option) => {
    const utils = new Util(option)
    Vue.$ctx.utils = utils
    Vue.config.globalProperties.$utils = utils
}