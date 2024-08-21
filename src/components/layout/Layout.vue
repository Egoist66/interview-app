<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


defineProps<{isAppLoading: boolean}>()

const {theme, toggleTheme} = useTheme()
const {user} = storeToRefs(useAuthStore())


</script>

<template>

    <div v-if="isAppLoading" class="card h-screen align-items-center flex justify-content-center">
        <ProgressSpinner />
    </div>
    <div v-else id="layout">
        <div class="container">
            <div class="flex justify-content-end align-items-center mb-3 gap-3">
                <Button class="bg-transparent border border-gray-300" @click="toggleTheme">
                    <i class="pi text-700" :class="theme === 'aura-light-blue' ? 'pi-moon' : 'pi-sun'"></i>
                </Button>

                
                <Avatar v-tooltip.bottom="'Пользователь:' + ' ' + user?.email + '\n\n' + 'ID: '  + user?.uid + ' '" v-if="user?.uid" icon="pi pi-user" class="mr-2" size="normal" shape="circle" />

            </div>
    
            <header>
            
                <slot name="header"/>
                
            </header>
        </div>


        <main>
            <div class="container">
                <slot name="deafault"/>
            </div>
        </main>

    </div>
</template>



<style scoped>

main {
    padding-top: 30px;
}


</style>