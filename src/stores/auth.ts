import { ref } from 'vue';
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth';
import {signOut, getAuth} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {


  const user = ref<User>()
  const userId = ref<string>('')


  const clearUser = async (callback: () => Promise<void>) => {
    await signOut(getAuth())
    userId.value = ''
    user.value = {} as User

    await callback()

  }

  const setUser = (_user: User) => {

    userId.value = _user?.uid
    user.value = _user
  }



  return { 
    userId,
    user,
    clearUser,
    setUser
  }
})
