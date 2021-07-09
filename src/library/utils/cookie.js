
// 默认配置
const defaultOption = {
    domain: location.hostname,
    affix: '',
    path: '/',
    second: 3600
}

// 获取过期时间
const expiresTime = second => {
    const exp = new Date()
    exp.setTime(exp.getTime() + second  * 1000)
    return exp.toUTCString()
}

class Cookie {
    constructor(option = {}) {
        Object.assign(this, {
            ...defaultOption,
            ...option
        })
    }

    get(key) {
        const cookies = document.cookie.split('; ')
        for (const cookie of cookies) {
            const index = cookie.indexOf('=')
            const name = decodeURIComponent(cookie.substr(0, index))
            if (name === `${key}${this.affix}`) {
                return decodeURIComponent(cookie.substr(index + 1))
            }
        }
    }

    set(key, value, opt) {
        const {
            affix,
            domain,
            path,
            second
        } = {
            ...this,
            ...opt
        }
        let str = `${key}${affix}=${encodeURIComponent(value)};path=${path};expires=${expiresTime(second)};`
        if (domain !== 'localhost') {
            str += `domain=${domain};`
        }
        document.cookie = str
    }

    remove(key, opt) {
        const {
            affix,
            domain,
            path
        } = {
            ...this,
            ...opt
        }
        const str = `${key}${affix}=0;expires=${new Date(0).toUTCString()};path=${path};domain=${domain};`
        document.cookie = str
    }
}

export default Cookie
