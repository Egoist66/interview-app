import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const userId = ref<string>('asdas')


  const clearUser = (callback: () => void) => {
    userId.value = ''

    callback()

  }


  return { 
    userId,
    clearUser
  }
})
