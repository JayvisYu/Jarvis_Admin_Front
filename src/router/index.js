import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    // 首页路由
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
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
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
    /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,
    {
        path: '/article',
        component: Layout,
        redirect: '/article/list',
        name: 'Article',
        meta: {
            title: '文章',
            icon: 'el-icon-document',
            roles: ['admin', 'editor']
        },
        alwaysShow: true,
        children: [{
                path: 'create',
                component: () => import('@/views/article/create'),
                name: 'CreateArticle',
                meta: {
                    title: '创建文章',
                    icon: 'edit',
                    roles: ['admin']
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/article/edit'),
                name: 'EditArticle',
                meta: { title: '修改文章', icon: 'edit', roles: ['admin'], noCache: true, activeMenu: '/article/list' },
                hidden: true
            },
            {
                path: 'list',
                component: () => import('@/views/article/list'),
                name: 'ArticleList',
                meta: { title: '文章列表', icon: 'list', roles: ['admin', 'editor'] },
            }
        ]
    },
    // {
    //     path: 'external-link',
    //     component: Layout,
    //     meta: { roles: ['admin'] },
    //     children: [{
    //         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //         meta: {
    //             title: 'External Link',
    //             icon: 'link',
    //             noCache: true
    //         }
    //     }]
    // },
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
