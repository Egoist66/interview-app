import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string>('ww')


  const clearUser = () => {
    userId.value = ''
  }


  return { 
    userId,
    clearUser
  }
})
