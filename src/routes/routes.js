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
const Home = resolve => { //home,主体框架
    require.ensure([], () => {
        resolve(require('@/views/Layout/Home.vue'))
    })
}
const Main = resolve => { //主页面,首页
    require.ensure([], () => {
        resolve(require('@/views/Layout/Main.vue'))
    })
}

const Bill = resolve => { //疫苗结账单
    require.ensure([], () => {
        resolve(require('@/views/Finance/bill.vue'))
    })
}


const Comment = resolve => {
    require.ensure([], () => {
        resolve(require('@/views/Procurement/Comment.vue'))
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
        name: '主页',
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
            { path: '/Lw_RDialog', component: Lw_RDialog, name: '右侧弹出' },
            { path: '/Dialog', component: Dialog, name: 'Dialog' }
        ] 
    }, 
	{
        path: '/',
        component: Home,
        name: '采购计划',
        iconCls: 'fa fa-calendar-minus-o',//图标样式class
        children: [
            { path: '/newPage', component: newPage, name: '疫苗计划单' },
            { path: '/Comment', component: Comment, name: '供应商发货单' }
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
            { path: 'ui', component: Form, name: '出库清单' },
            { path: 'iu', component: user, name: '出库退货单' },
        ]
    }, 
	{
        path: '/',
        component: Home,
        name: '库存管理',
        iconCls: 'fa fa-cube',//图标样式class
        children: [
            { path: 'uy', component: Table, name: '库存盘点' },
            { path: 'uu', component: Table, name: '库存调整' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-database',
        children: [
            { path: 're', component: Page4, name: '预收款' },
            { path: 'ee', component: Page5, name: '预付款' },
            { path: '/bill', component: Bill, name: '进苗结账单' },
            { path: 'yy', component: Page5, name: '销苗结账单' }
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
            { path: 'we', component: Page5, name: '财务统计' },
            { path: 'wr', component: Page5, name: '疫苗流向追踪' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '档案管理',
        iconCls: 'fa el-icon-document',
        children: [
            { path: 'qw', component: Page4, name: '疫苗档案' },
            { path: 'qe', component: Page5, name: '单位档案' },
            { path: 'qr', component: Page5, name: '供应方&厂家档案' },
            { path: 'qt', component: Page5, name: '仓库档案' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-cog',
        children: [
            { path: 'w', component: Page4, name: '通用功能' },
            { path: 'e', component: Page5, name: '角色管理' },
            { path: 'r', component: Page5, name: '用户管理' },
            { path: 't', component: Page5, name: '权限分配' },
            { path: 'y', component: Page5, name: '系统设置' },
            { path: 'us', component: Page5, name: '日志查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '辅助功能',
        iconCls: 'fa el-icon-news',
        children: [
            { path: '/q', component: Page4, name: '批签发更新' },
            { path: '/a', component: Page5, name: '库存调价' },
            { path: '/x', component: Page5, name: '审核撤销' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '用户中心' }
        ]
    }
];

export default routes;