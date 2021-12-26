import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    // 首页路由
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'el-icon-discover' }
        }]
    },
    // 重定向路由
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index')
        }]
    },
    // 登陆路由
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    // 404路由
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    }, {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },

    // 个人介绍
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [{
            path: 'index',
            component: () => import('@/views/profile/index'),
            name: 'Profile',
            meta: { title: '关于我', icon: 'user', noCache: true }
        }]
    },
]

export const asyncRoutes = [
    /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,
    {
        path: '/stock',
        component: Layout,
        redirect: '/stock/select',
        name: 'Stock',
        meta: {
            title: '股票板块',
            icon: 'el-icon-collection',
            roles: ['super_admin', 'admin', 'editor', 'visitor']
        },
        alwaysShow: true,
        children: [{
                path: 'select',
                component: () => import('@/views/stock/select'),
                name: 'SelectStock',
                meta: {
                    title: '选股策略',
                    icon: 'el-icon-sunny',
                    roles: ['super_admin', 'admin', 'editor', 'visitor']
                },
            },
            {
                path: 'select/:EName',
                component: () => import('@/views/stock/select_stock'),
                name: 'select_stock',
                meta: { title: '策略详情', noCache: true, activeMenu: '/stock/select' },
                hidden: true
            },
            {
                path: 'timing',
                component: () => import('@/views/stock/timing'),
                name: 'StockSelectTiming',
                meta: {
                    title: '股票择时策略',
                    icon: 'el-icon-moon',
                    roles: ['super_admin', 'admin', 'editor', 'visitor']
                }
            },
            {
                path: 'timing/:EName',
                component: () => import('@/views/stock/stock_timing'),
                name: 'stock_timing',
                meta: { title: '策略详情', noCache: true, activeMenu: '/stock/timing' },
                hidden: true
            },
        ]
    },
    {
        path: '/option',
        component: Layout,
        redirect: '/option/select',
        name: 'Option',
        meta: {
            title: '期权板块',
            icon: 'el-icon-ship',
            roles: ['super_admin', 'admin']
        },
        alwaysShow: true,
        children: [{
            path: 'timing',
            component: () => import('@/views/option/timing'),
            name: 'SelectTiming',
            meta: {
                title: '期权择时策略',
                icon: 'el-icon-moon',
                roles: ['super_admin', 'admin']
            }
        }]
    },
    {
        path: '/digital_currency',
        component: Layout,
        redirect: '/digital_currency/timing',
        name: 'digitalCurrency',
        meta: {
            title: '数字货币板块',
            icon: 'el-icon-trophy',
            roles: ['super_admin']
        },
        alwaysShow: true,
        children: [{
            path: 'timing',
            component: () => import('@/views/digital_currency/timing'),
            name: 'CoinSelectTiming',
            meta: {
                title: '数字货币择时策略',
                icon: 'el-icon-moon',
                roles: ['super_admin']
            }
        }, {
            path: 'real_exchange',
            component: () => import('@/views/digital_currency/real_exchange'),
            name: 'RealExchange',
            meta: {
                title: '实盘监控',
                icon: 'el-icon-coordinate',
                roles: ['super_admin']
            }
        }, ]
    },
    {
        path: '/article',
        component: Layout,
        redirect: '/article/list',
        name: 'Article',
        meta: {
            title: '量化精选文集',
            icon: 'el-icon-document',
            roles: ['super_admin', 'admin', 'editor']
        },
        alwaysShow: true,
        children: [{
                path: 'create',
                component: () => import('@/views/article/create'),
                name: 'CreateArticle',
                meta: {
                    title: '创建文章',
                    icon: 'edit',
                    roles: ['super_admin', 'admin', 'editor']
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/article/edit'),
                name: 'EditArticle',
                meta: { title: '修改文章', icon: 'edit', roles: ['super_admin', 'admin'], noCache: true, activeMenu: '/article/list' },
                hidden: true
            },
            {
                path: 'list',
                component: () => import('@/views/article/list'),
                name: 'ArticleList',
                meta: { title: '文章列表', icon: 'list', roles: ['super_admin', 'admin', 'editor', 'visitor'] },
            }
        ]
    },
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/role',
        name: 'Setting',
        meta: {
            title: '管理中心',
            icon: 'el-icon-setting',
            roles: ['super_admin', 'admin']
        },
        alwaysShow: true,
        children: [{
                path: 'role',
                component: () => import('@/views/setting/role'),
                name: 'RoleSetting',
                meta: {
                    title: '角色管理',
                    icon: 'edit',
                    roles: ['super_admin', 'admin']
                }
            },
            {
                path: 'index',
                component: () => import('@/views/profile/index'),
                name: 'OwnProfile',
                meta: {
                    title: '个人中心',
                    icon: 'user',
                    roles: ['super_admin', 'admin'],
                    noCache: true
                }
            },
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
