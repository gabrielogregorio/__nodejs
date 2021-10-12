import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'  
import adminAuth from '../middlewares/authUser';

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    beforeEnter: adminAuth
  },
  {
    path: '/Create',
    name: 'Create',
    component: () => import('../views/Create.vue'),
    beforeEnter: adminAuth
  },
  {
    path: '/Edit',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
    beforeEnter: adminAuth
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
