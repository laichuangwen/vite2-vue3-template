
// TODO: 支持Object的存取

// 默认配置
const defaultOption = {
    affix: ''
}

class LocalStorage {
    constructor(option = {}) {
        Object.assign(this, {
            ...defaultOption,
            ...option
        })

        this.eventPool = {}
        // 监听storage变化事件
        window.addEventListener('storage', e => {
            const eventName = e.key
            if (this.eventPool[eventName]) {
                for (const callback of this.eventPool[eventName]) {
                    typeof callback === 'function' && callback(e.newValue)
                }
            }
        })
    }

    get(key) {
        const { affix } = this
        return localStorage.getItem(`${key}${affix}`)
    }

    set(key, value, opt) {
        const { affix } = { ...this, ...opt }
        localStorage.setItem(`${key}${affix}`, value)
    }

    remove(key, opt) {
        const { affix } = { ...this, ...opt }
        localStorage.removeItem(`${key}${affix}`)
    }

    // 添加当前窗口对key事件的监听
    addEvent(eventName, callback) {
        const key = `${eventName}${this.affix}`
        this.eventPool[key] = this.eventPool[key] || []
        this.eventPool[key].push(callback)

        return () => {
            this.removeEvent(eventName, callback)
        }
    }

    // 移除监听
    removeEvent(eventName, callback) {
        const key = `${eventName}${this.affix}`
        const events = this.eventPool[key] || []
        events.splice(events.indexOf(callback), 1)
    }

    // 触发key事件（即写入一个随机值）
    handle(eventName, prop = Math.random(1)) {
        this.set(eventName, prop)
    }
}

export default LocalStorage
