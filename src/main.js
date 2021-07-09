import App from './App.vue'
import createApp from './library/create-app';
import resetCss from './library/reset-css';
import utils from './library/utils';
import router from './library/router';
import element from './library/element-plus';
import i18n from './library/i18n';
import store from './library/store';
import api from './library/api';
import auth from './library/auth';
import com from './library/com';

const app = createApp(App)
app.task('重置样式', () => resetCss())
app.task('工具方法', app => utils(app))
app.task('路由', app => router(app))
app.task('基础组件', ['重置样式'], app => element(app))
app.task('自定义组件', ['重置样式','基础组件'], app => com(app))
app.task('多语言', app => i18n(app))
app.task('请求处理', ['工具方法','基础组件', '多语言'], app => api(app))
app.task('状态管理', ['路由', '基础组件', '多语言','请求处理'], app => store(app))
app.task('鉴权', ['路由','状态管理','请求处理'], app => auth(app))
app.task('初始化语言', ['状态管理'], ({ Vue }) => {
    Vue.$ctx.store.dispatch('user/config/init')
 })
app.use(app.getAllTask())
app.start()

