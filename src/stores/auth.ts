import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
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
