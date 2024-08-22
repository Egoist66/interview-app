

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter()
const {user}  = storeToRefs(useAuthStore())

</script>

<template>
    <div class="surface-section p-6 pb-8 flex align-items-center justify-content-center">
        <div class="surface-card shadow-2 p-3 border-round w-full lg:w-6">
            <div class="text-center mb-4">
                <img :src="user?.photoURL ?? 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'" alt="Vue" class="w-32 mb-3 shadow-2 mx-auto">
                <h5 class="font-bold mb-0">{{ user?.displayName }}</h5>
                <p class="text-600 text-muted mb-0"><a class="text-blue-600" :href="`mailto:${user?.email}`">{{ user?.email }}</a></p>
            </div>
            <div class="text-center">
                <Button icon="pi pi-arrow-left"  label="Назад" class="p-3 w-full" @click="router.back()" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>