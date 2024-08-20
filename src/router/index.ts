import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
        title: 'Home'
      },
      component: () => import('@/pages/HomeView.vue')
    },

    {
      path: '/interview-list',
      name: 'interview-list',
      meta: {
        requiresAuth: true,
        title: 'Interview List'
      },
      component: () => import('@/pages/InterviewView.vue')
    },

    
    {
      path: '/statistics',
      name: 'statistics',
      meta: {
        requiresAuth: true,
        title: 'Statistics'
      },
      component: () => import('@/pages/StatisticsView.vue')
    },

    {
      path: '/auth',
      name: 'auth',
      meta: {
        requiresAuth: true,
        title: 'Auth'
      },
      component: () => import('@/pages/AuthView.vue')
    },


  ]
})


router.beforeEach((to, from, next) => {
  const {userId} = useAuthStore()
  if(!userId.length && to.path !== '/auth') {
    return {
      path: '/auth'
    }
  }

  document.title = `${to.meta.title as string } ${to.params.id ? ` - ${to.params.id}` : ''}`
  next()

})

export default router
