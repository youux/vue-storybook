import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ 'views/home'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "welcome" */ 'pages/welcome')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import(/* webpackChunkName: "page1" */ 'pages/page1')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import(/* webpackChunkName: "page2" */ 'pages/page2')
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import(/* webpackChunkName: "page3" */ 'pages/page3')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
