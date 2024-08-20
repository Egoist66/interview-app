
<script setup lang="ts">
import { useRouterLinks } from '@/composables/useRouterLinks';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const {routeLinks} = useRouterLinks()
const router = useRouter()
</script>


<template>
    <Menubar class="menu" :model="routeLinks">
     
        <template #item="{ item, props }">
            <template v-if="item.show">
                <RouterLink v-bind="props.action" :to="item.path" v-ripple class="flex align-items-center">
                    <span :class="[item.icon, 'p-menuitem-icon']"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </RouterLink>
            </template>
        </template>
        <template #end>
            <template v-if="auth.userId.length">
                <div @click="auth.clearUser(() => router.replace('/auth'))" class="flex align-items-center gap-2">
                    <div class="menu-exit flex align-items-center">
                        <span class="pi pi-sign-out p-menuitem-icon"/>
                        <span class="ml-2">Выйти</span>
                    </div>
    
                </div>
            </template>

           
        </template>
    </Menubar>
</template>

<style scoped>

.menu-exit {
    cursor: pointer;
}

</style>