
// 把路由对应的组件定义成异步组件
const Login = resolve => { //登录
    require.ensure([], () => {
        resolve(require('@/views/Layout/Login.vue'))
    })
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


const Table = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav1/Table.vue'))
    })
}
const Form = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav1/Form.vue'))
    })
}
const user = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav1/user.vue'))
    })
}
const Page4 = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav2/Page4.vue'))
    })
}
const Page5 = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav2/Page5.vue'))
    })
}
const Page6 = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav3/Page6.vue'))
    })
}
const Report = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav3/Report.vue'))
    })
}
const Comment = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav3/Comment.vue'))
    })
}
const Upload = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav3/Upload.vue'))
    })
}
const newPage = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav4/newPage.vue'))
    })
}
const echarts = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/charts/echarts.vue'))
    })
}
const newZj = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/nav4/newZj.vue'))
    })
}
const Dialog = resolve => {
    require.ensure([], () => {
        resolve(require('@/components/Dialog.vue'))
    })
}
const Lw_RDialog = resolve => {
    require.ensure([], () => {
        resolve(require('@/components/Lw_RDialog.vue'))
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
    },
    {
        path: '/',
        component: Home,
        name: '弹出层',
        hidden: true,
        children: [
            { path: '/Lw_RDialog', component: Lw_RDialog, name: '右侧弹窗' },
            { path: '/Dialog', component: Dialog, name: 'Dialog' }
        ] 
    },  
	{
        path: '/',
        component: Home,
        name: '入库出库',
        iconCls: 'fa el-icon-sort',//图标样式class
        children: [
            { path: 'eez', component: Table, name: '入库登记' },
            { path: 'rr', component: Table, name: '入库清单' },
            { path: 'yu', component: Table, name: '入库退货单' },
            { path: 'uy', component: Form, name: '出库登记' },
            { path: 'ui', component: Form, name: '出库清单' }
        ]
    }, 
	{
        path: '/',
        component: Home,
        name: '库存管理',
        iconCls: 'fa fa-cube',//图标样式class
        children: [
            { path: 'uy', component: Table, name: '库存盘点' },
            { path: 'uu', component: Table, name: '库存调整' },
            { path: 'uu', component: Table, name: '库存调拨' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用苗管理',
        iconCls: 'fa el-icon-document',
        children: [
            { path: 'qw', component: Page4, name: '用苗登记' },
            { path: 'qe', component: Page5, name: '扫码接种' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-database',
        children: [
            { path: 'ee', component: Page5, name: '预付款' },
            { path: 'tt', component: Page5, name: '进苗结账单' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计分析',
        iconCls: 'fa fa-pie-chart',
        children: [
            { path: 'wq', component: Page4, name: '库存统计' },
            { path: 'ww', component: Page5, name: '出入库统计' },
            { path: 'we', component: Page5, name: '财务统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '用户中心' }
        ]
    }
];

export default routes;