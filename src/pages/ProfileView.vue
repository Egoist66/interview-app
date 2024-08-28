

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
              
                <img :src="!user?.photoURL?.length ? 'https://www.canterburysociety.org.uk/wp-content/uploads/2020/04/person-placeholder.jpg' : user?.photoURL" alt="avatar" class="w-32 mb-3 shadow-2 mx-auto">
                <h5 class="font-bold mb-0">{{ user?.displayName }}</h5>
                <p class="text-600 text-muted mb-0"><a class="text-blue-600" :href="`mailto:${user?.email}`">{{ user?.email }}</a></p>
                <p class="text-600 text-muted mb-0">{{ user?.phoneNumber }}</p>
                <p class="text-600 text-muted mb-0"><b>User ID</b> - {{ user?.uid }}</p>
            </div>
            <div class="text-center">
                <Button icon="pi pi-arrow-left"  label="Назад" class="p-3 w-full" @click="router.back()" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>