
# 背景 
每个人本地开发与后端联调都要更改proxy最后还提交导致冲突
## 解决方案 （利用require访问优先等级）
新建proxy.js 文件，内容和proxy/index.js 一样，自己更改proxy文件就好了，.gitignore会自动忽略掉proxy.js防止提交


