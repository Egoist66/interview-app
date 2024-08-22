<script setup lang="ts">
import {RouterView } from 'vue-router'
import Layout from '@/components/layout/Layout.vue';
import AppHeader from '@/components/AppHeader.vue';
import { delay } from '@/utils/delay';
import {onMounted } from 'vue';
import { useAuth } from './composables/useAuth';
import { useAuthStore } from './stores/auth';
import { useApp } from './composables/useApp';

const {checkIsAuth} = useAuth()
const {isAppLoading} = useApp()


onMounted(async () => {
    checkIsAuth()
    await delay(1500)
    isAppLoading.value = false

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
