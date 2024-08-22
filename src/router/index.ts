import { useAuthStore } from '@/stores/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedGeneric, type RouteLocationNormalized } from 'vue-router'

/**
 * Validates the current route and redirects to the authentication page if the user is not authenticated.
 * Also updates the document title based on the current route.
 *
 * @param {RouteLocationNormalizedGeneric} to - The current route location.
 * @param {RouteLocationNormalized} from - The previous route location.
 * @param {NavigationGuardNext} next - The next navigation guard.
 * @return {Object} An object with the redirect path if the user is not authenticated.
 */
const validateRoutes = (
  to: RouteLocationNormalizedGeneric, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  const {userId} = useAuthStore()

  document.title = `${to.meta.title as string }`

  if(!userId.length && to.path !== '/auth') {
    next({name: 'auth'})
  }
  else {
    next()
  }


}







const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
        title: 'Органайзер интерьвью'
      },
      component: () => import('@/pages/HomeView.vue')
    },

    {
      path: '/interview-list',
      name: 'interview-list',
      meta: {
        requiresAuth: true,
        title: 'Список интервью'
      },
      component: () => import('@/pages/InterviewListView.vue')
    },

    {
      path: '/interview/:id',
      name: 'interview',
      meta: {
        requiresAuth: true,
        title: 'Интервью'
      },
      component: () => import('@/pages/InterviewSingleView.vue')
    },



    {
      path: '/statistics',
      name: 'statistics',
      meta: {
        requiresAuth: true,
        title: 'Статистика по интерьвью'
      },
      component: () => import('@/pages/StatisticsView.vue')
    },

    {
      path: '/auth',
      name: 'auth',
      meta: {
        requiresAuth: true,
        title: 'Логин | Регистрация'
      },
      component: () => import('@/pages/AuthView.vue')
    },


    {
      path: '/profile/user/:id',
      name: 'profile',
      meta: {
        requiresAuth: true,
        title: 'Профиль'
      },
      component: () => import('@/pages/ProfileView.vue')
    },


  ]
})


router.beforeEach(validateRoutes)

export default router
