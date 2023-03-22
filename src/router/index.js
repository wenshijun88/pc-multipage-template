import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: 'index',
    meta: {
      title: '模块1'
    },
    component: () => import('../layout'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '子页面1'
        },
        component: () => import('@/pages/index')
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export default router
