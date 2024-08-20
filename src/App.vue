<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Layout from '@/components/layout/Layout.vue';
import AppHeader from '@/components/AppHeader.vue';


</script>

<template>


  <Layout>

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
