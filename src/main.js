import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import ElSearchTablePagination from 'el-search-table-pagination'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes/routes'
import RouteCommunity from './routes/community'
import RoutePoint from './routes/point'
import RouteNoAuthority from './routes/noAuthority'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// Default use axios as HTTP tool
Vue.use(ElSearchTablePagination)
// or set a custom HTTP tool
import axios from 'axios'
Vue.use(ElSearchTablePagination, {
    axios
})
NProgress.configure({ showSpinner: false });
let router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    localStorage.removeItem('user');
  }
  let user = JSON.parse(localStorage.getItem('user'));
  //判断加载哪种路由
  if(user&&user!=""&&user!=null&&user!=undefined){
	  if(user.power == "admin"){
		  router.options.routes = routes;
	  }else if(user.power == "community"){
		  router.options.routes = RouteCommunity;
	  }else if(user.power == "point"){
		  router.options.routes = RoutePoint;
	  }else{
		  router.options.routes = RouteNoAuthority;
	  }
  }
  //判断当前是否登录
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

router.afterEach(transition => {
	NProgress.done();
});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

