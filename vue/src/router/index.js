import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '../store'

const routes = [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: {requiredAuth: true},
      children: [
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      meta: {isAuth: true},
      children: [
        { path: '/login', name: 'Login', component: Login },
        { path: '/register', name: 'Register', component: Register }
      ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiredAuth && !store.state.user.token) {
    next({ name: 'Login' })
  } else if(store.state.user.token && to.meta.isAuth){
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router;
