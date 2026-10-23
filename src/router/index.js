import { createRouter, createWebHistory } from 'vue-router'
import { authState, waitForAuth } from '../firebase/auth'
import { isAuthenticated } from '../auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresLogin: true },
    },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    {
      path: '/FireSignIn',
      name: 'FireSignIn',
      component: () => import('../views/FirebaseSigninView.vue'),
    },
    {
      path: '/FireRegister',
      name: 'FireRegister',
      component: () => import('../views/FirebaseRegisterView.vue'),
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MembersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: () => import('../views/AddBookView.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'librarian'] },
    },
    {
      path: '/WeatherCheck',
      name: 'GetWeather',
      component: () => import('../views/WeatherView.vue'),
    },
    {
      path: '/GetBookCount',
      name: 'GetBookCount',
      component: () => import('../views/GetBookCountView.vue'),
    },
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: () => import('../views/CountBookAPI.vue'),
    },
    {
      path: '/GetAllBookAPI',
      name: 'GetAllBookAPI',
      component: () => import('../views/GetAllBookAPI.vue'),
    },
    {
      path: '/access-denied',
      name: 'access-denied',
      component: () => import('../views/AccessDeniedView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to) => {
  await waitForAuth()
  if (to.meta.requiresLogin && !isAuthenticated.value) return { name: 'login' }
  if (to.meta.requiresAuth && !authState.user)
    return { name: 'FireSignIn', query: { redirect: to.fullPath } }
  if (to.meta.roles && !to.meta.roles.includes(authState.role)) return { name: 'access-denied' }
})

export default router
