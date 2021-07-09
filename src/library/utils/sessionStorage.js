
// TODO: 支持Object的存取

// 默认配置
const defaultOption = {
    affix: ''
}

class SessionStorage {
    constructor(option = {}) {
        Object.assign(this, {
            ...defaultOption,
            ...option
        })
    }

    get(key) {
        const { affix } = this
        return sessionStorage.getItem(`${key}${affix}`)
    }

    set(key, value, opt) {
        const { affix } = { ...this, ...opt }
        sessionStorage.setItem(`${key}${affix}`, value)
    }

    remove(key, opt) {
        const { affix } = { ...this, ...opt }
        sessionStorage.removeItem(`${key}${affix}`)
    }
}

export default SessionStorage
