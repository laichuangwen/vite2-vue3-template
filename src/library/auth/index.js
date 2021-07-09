
export default ({ Vue }) => {
    const {
        utils: {
            cookie
        },
    } = Vue.$ctx
    class Auth {

        constructor() {
            this.tokenName = 'accessToken'
            this.refreshTokenName = 'refreshToken'
        }
        // 获取token
        getToken() {
            return cookie.get(this.tokenName) || ''
        }

        // 设置token
        setToken({
            accessToken,
            accessTokenExp
        }) {
            // 设置token到cookie中
            cookie.set(this.tokenName, accessToken, {
                second: accessTokenExp
            })
        }
        // 设置刷新token
        setRefreshToken({
            refreshToken,
            refreshTokenExp
        }) {
            cookie.set(this.refreshTokenName, refreshToken, {
                second: refreshTokenExp
            })
        }
        //获取刷新token
        getRefreshToken() {
            return cookie.get(this.refreshTokenName) || ''
        }
        // 清空token
        clearToken() {
            cookie.remove(this.tokenName)
            cookie.remove(this.refreshToken)
        }
        // 刷新token
        async refreshToken() {
            const refreshToken = this.getRefreshToken()
            if (!refreshToken) {
                // 没有刷新token 跳转登录页
                this.signout()
                return
            }
            try {
                const auth = await Vue.$ctx.api.get('/api/app-user/refresh-token', {
                    params: {
                        refreshToken
                    }
                })
                console.log('刷新token', auth);
                this.setToken(auth)
            } catch (error) {
                console.error(error);
            }

        }
        // 授权客户端
        async authByClient() {
            const refreshToken = this.getRefreshToken()
            if (!refreshToken) {
                // 没有刷新token 跳转登录页
                this.signout()
                return
            }
            const accessToken = this.getToken()
            if (!accessToken) {
                // 没有就刷新
                await this.refreshToken()
            }
            // 解析url
            const {
                clientId,
                redirectUrl,
                state = ''
            } = Vue.$ctx.$route.query

            if (!clientId) return Vue.$ctx.$message.error('clientId can not be empty!')
            if (!redirectUrl) return Vue.$ctx.$message.error('redirectUrl can not be empty!')
            try {
                const code = await Vue.$ctx.api.postQuery('/api/open-auth/auth-by-client', {
                    clientId,
                    redirectUrl,
                })
                let url = ''
                // 有参数情况
                if (redirectUrl.includes('?')) {
                    url = decodeURI(`${redirectUrl}&code=${code}&state=${state}`)
                } else {
                    url = decodeURI(`${redirectUrl}?code=${code}&state=${state}`)
                }
                location.replace(url)
            } catch (error) {
                console.error(error);
            }
        }

        // 退出登录
        async signout() {
            this.clearToken()
            const {
                query
            } = Vue.$ctx.$route
            Vue.$ctx.router.replace({ path: '/login', query })
        }
    }

    Vue.$ctx.auth = new Auth()
}
