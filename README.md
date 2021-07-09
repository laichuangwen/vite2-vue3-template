# vite2-vue3-template
- 用vite2搭建的项目vue3项目，包含：sass、 按需引入element-plus、 element-plus主题更改、axios封装、vuex、vue-i18n、vue-router 、moment、引入字体库等
- dockerfile部署 、ci 打包镜像等，要配置密码具体ci文件
- 注意版本！！！！现阶段有些版本不是稳定，要对应版本只能用支持ES module 版本：比如：vue-i18n要9以上、vue-router要4以上、vuex要4以上
- 项目只做参考学习

## 启动
```
yarn && yarn dev
```

## 打包
```
yarn build
```
## 预览
```
yarn sever
```
## 打包镜像
```
yarn deploy
```

## 例子

- 接口请求，请求方法参考 [axios](https://github.com/axios/axios),只是编写了拦截器 
```
    try {
        const auth = await this.$api.post('/api/app-user/auth-by-password', {
            username: this.$utils.AES.Encrypt(this.form.username),
            password: this.$utils.AES.Encrypt(this.form.password)
        })
        const auth = await this.$api.get('/api/app-user/auth-by-password', {
            params:{
                username: this.$utils.AES.Encrypt(this.form.username),
                password: this.$utils.AES.Encrypt(this.form.password)
            }
        })
    } catch (error) {
        console.error(error);
    }
```