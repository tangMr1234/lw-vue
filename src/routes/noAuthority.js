// 把路由对应的组件定义成异步组件
const Login = resolve => { //登录
    require.ensure([], () => {
        resolve(require('@/views/Layout/Login.vue'))
    }, 'Login')
}
const NotFound = resolve => { //404
    require.ensure([], () => {
        resolve(require('@/views/Layout/404.vue'))
    })
}
const Home = resolve => { //home
    require.ensure([], () => {
        resolve(require('@/views/Layout/Home.vue'))
    })
}
const Main = resolve => { //主页面
    require.ensure([], () => {
        resolve(require('@/views/Layout/Main.vue'))
    })
}


let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录界面',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '错误界面',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
	{
        path: '/',
        component: Home,
        name: '',
		redirect: '/main',
        iconCls: 'fa el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '系统首页' }
        ]
    }
];

export default routes;