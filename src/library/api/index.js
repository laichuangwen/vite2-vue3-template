import axios from 'axios'
import qs from 'qs'

export default ({ Vue }) => {
    const {
        utils: {
            cookie,
        },
    } = Vue.$ctx
    const axiosInstance = axios.create({
        headers: {},
    })
    // 拦截器 请求头加token
    axiosInstance.interceptors.request.use(async (config) => {
        let accessToken = cookie.get('accessToken')
        config.headers.token = accessToken || '';
        return config;
    });
    // 
    axiosInstance.interceptors.response.use((response) => {
        // 请求成功处理
        const { config, data } = response
        if (!data.code) {
            // 没有resCode说明可能是文件流
            return Promise.resolve(data)
        } else if (data.code === 200) {
            return Promise.resolve(data.result)
        }

        switch (data.errcode) {
            case 100400:
            case 100401:
            case 100403:
                Vue.$ctx.$message.error('登录已失效,请重新登录!')
                setTimeout(() => {
                    //  Vue.$ctx.auth.signout()
                }, 2000)
                return Promise.reject(data.result)
            default:
                const errToast = config.errToast === undefined || config.errToast
                errToast && Vue.$ctx.$message.error(data.msg)
                return Promise.reject(data)
        }
    }, (error) => {
        // 请求失败处理
        const { config, response, message } = error
        console.error('responseError:', error)
        // 通过axios主动取消请求
        if (message === 'cancel') {
            return error
        }
        if (!window.navigator.onLine) {
            Vue.$ctx.$message.error('您的网络挂了,请网络正常后再进行系统操作 (ಥ﹏ಥ)')
            return
        }
        const errToast = config.errToast === undefined || config.errToast

        let errMsg = response.data

        if (response.status === 401) {
            Vue.$ctx.$message.error('登录已失效,请重新登录!')
            setTimeout(() => {
                // Vue.$ctx.auth.signout(401)
            }, 2000)
            return Promise.reject(errMsg)
        }

        let errData = {
            msg: response.statusText,
            resultcode: response.status
        }
        if (typeof errMsg === 'object') {
            errMsg = response.data
            errData = {
                msg: errMsg.error,
                resultcode: errMsg.resultcode,
                data: errMsg.data
            }
        }
        errToast && Vue.$ctx.$message.error(errData.msg || '服务器开小车了~')
        return Promise.reject(errData)
    })
    // 添加两个方法
    axiosInstance.postQuery = (url, params) => axiosInstance.post(url, qs.stringify(params))
    axiosInstance.putQuery = (url, params) => axiosInstance.put(url, qs.stringify(params))
    Vue.$ctx.api = axiosInstance
    // 注入
    Vue.use({
        axiosInstance,
        install(app) {
            axiosInstance,
            app.config.globalProperties.$api = axiosInstance
        }
    })
}