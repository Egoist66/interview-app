<script setup lang="ts">
import {RouterView, useRouter } from 'vue-router'
import Layout from '@/components/layout/Layout.vue';
import AppHeader from '@/components/AppHeader.vue';
import { delay } from '@/utils/delay';
import {onMounted, watch } from 'vue';
import { useAuth } from './composables/useAuth';
import { useAuthStore } from './stores/auth';
import { useApp } from './composables/useApp';

const auth = useAuthStore()
const {checkIsAuth} = useAuth()
const router = useRouter()
const {isAppLoading} = useApp()


onMounted(async () => {
    checkIsAuth()
    await delay(1000)
    isAppLoading.value = false

})



watch(auth, async () => {
    if(auth.userId.length) {
      await router.replace('/')
    }
})


</script>

<template>


  <Layout :isAppLoading="isAppLoading">

    <template #header>
      <AppHeader />
    </template>

    <template #deafault>
      <RouterView />
    </template>

  </Layout>

</template>

<style scoped>

</style>
