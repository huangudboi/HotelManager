import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormView from '@/views/signIn_singUp/FormView.vue'
import CreateView from '@/views/CreateView.vue'
import ReportView from '@/views/ReportView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'HomePage'},
    },
    {
      path: '/createNew',
      name: 'createNew',
      component: CreateView,
      meta: { title: 'Check in'},
    },
    {
      path: '/report/detail',
      name: 'report',
      component: DetailView,
      meta: { title: 'TOK1-1A'},
    },
    {
      path: '/report',
      name: 'detail',
      component: ReportView,
      meta: { title: 'Report'},
    },
    {
      path: '/login',
      name: 'login',
      component: FormView,
      props: { isLoginScreen: true },
      meta: { requiresAuth: true, title: 'Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: FormView,
      props: { isLoginScreen: false },
      meta: { requiresAuth: true, title: 'Register' }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const token = getLocalStorageByItem('USER_LOGIN')
//   if (to.name !== 'login' && !token && !to.meta.requiresAuth) {
//     next({ name: 'login' })
//   }
//   next()
// })
router.beforeEach((to) => {
  document.title = to.meta.title
})

export default router
