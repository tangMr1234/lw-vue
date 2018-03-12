**demo**: [https://tangmr1234.github.io/run/vue/#/login](https://tangmr1234.github.io/run/vue/#/login)

# 演示账户
账户1：admin  密码：123456    
账户2：ceshi  密码：123456

# 开始
使用脚手架 [vue-cli](https://github.com/vuejs/vue-cli)

``` bash
# 安装依赖
npm install

# 本地运行项目 端口使用:8081
npm run dev

# 本地打包
npm run build

```

# 文件夹结构
* build - webpack config files
* config - webpack config files
* dist - 打包好的文件夹
* src - 你的app
    * api - 数据接口api
    * assets - 图片等资源
    * common
    * components - your vue components
    * mock - 虚拟数据
    * styles
    * views - 视图
    * vuex 
    * App.vue
    * main.js - 主程序
    * routes.js - 路由 
* static - static assets

# 皮肤
你可以在这里自由的切换皮肤 
1. 通过 [https://elementui.github.io/theme-preview/#/](https://elementui.github.io/theme-preview/#/) 生成主题包
2. 将主题包放入 src/assets/theme/
3. 编辑 src/main.js 加入
``` bash
   import 'element-ui/lib/theme-default/index.css'
   import './assets/theme/your-theme/index.css'
```
4. 编辑 src/styles/vars.scss

![theme-blue](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/rec-demo.gif)

# 浏览器支持

主流浏览器 and IE 10+.

# 其他相关

1. [搭建vue-cli脚手架加上element-ui](https://segmentfault.com/a/1190000010291674)
2. [版本检查与升级](http://blog.csdn.net/wojiaomaxiaoqi/article/details/78428738)
3. [Vue-Router 2实现路由功能](http://blog.csdn.net/sinat_17775997/article/details/54710420)
4. [axios- vue里的同异步请求](https://github.com/axios/axios)
5. [Vue2.0---将页面中表格数据导出excel](https://www.cnblogs.com/Mrfan217/p/6944238.html)
6. [webpack的代码压缩配置](http://www.css88.com/doc/webpack2/plugins/uglifyjs-webpack-plugin/)
7. [vue组件之间的传值](https://www.cnblogs.com/missxiaojun/p/6882491.html)
8. [类似js方式取url上的参数](https://www.cnblogs.com/xyyt/p/6068981.html)
