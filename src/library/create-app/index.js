
import { createApp } from 'vue'

class App {
    constructor(root) {
        this.Vue = createApp(root)
        this.Vue.$ctx = this.Vue.config.globalProperties
        this.taskPool = {}// 任务池
        this.queue = []// 队列
    }

    sleep(timeout = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, timeout)
        })
    }

    // 获取所有定义的任务
    getAllTask() {
        return Object.keys(this.taskPool)
    }

    taskHandle(task, arg) {
        if (typeof task.install === 'function') {
            return task.install.apply(task.install, arg)
        } else if (typeof task === 'function') {
            return task.apply(task, arg)
        }
    }

    // 任务promise
    async getTaskPromise(key) {
        const task = this.taskPool[key]
        if (!task.promise) {
            task.promise = new Promise(async resolve => {
                await Promise.all(task.deps.map(key => this.getTaskPromise(key)))
                // 改用settimeout，可以让外层的promise 异常捕获更快
                setTimeout(async () => {
                    await this.taskHandle(task.handle, [this].concat(task.config))
                    resolve(true)
                }, 0)
            })
        }
        return task.promise
    }

    // 注入任务
    use(task, config) {
        if (typeof task === 'string' || Array.isArray(task)) {
            // 注入任务池中的任务
            const tasks = [].concat(task) // 转为数组
            this.queue.push(async () => {
                await Promise.all(tasks
                    .map(key => this.getTaskPromise(key)))
            })
        } else {
            // 注入指定任务
            this.queue.push(() => this.taskHandle(task, [this].concat(config)))
        }
        return this
    }

    // 定义任务
    task(name, deps, handle, config) {
        if (!name) {
            throw new Error('app.task(name, deps, handle, config) 缺少name参数')
        }
        if (this.taskPool[name]) {
            throw new Error('任务已存在，请勿重复添加')
        }

        if (typeof deps === 'function') {
            config = handle
            handle = deps
            deps = []
        }

        this.taskPool[name] = {
            name,
            deps,
            handle,
            config
        }
        return this
    }

    // 启动
    async start(el = '#app') {
        window.Vue = this.Vue
        for (const task of this.queue) {
            await task()
        }
        this.Vue.mount(el)

    }
}

export default (root) => new App(root)
