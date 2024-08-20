<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const auth = useAuthStore()
const router = useRouter()

const {theme, toggleTheme} = useTheme()

onMounted(() => {
    if(auth.userId.length) {
        router.replace('/')

    }
    
})

</script>

<template>
    <div id="layout">

        <div class="container">
            <div class="flex justify-content-end mb-3">
                <Button class="bg-transparent border border-gray-300" @click="toggleTheme">
                    <i class="pi text-700" :class="theme === 'aura-light-blue' ? 'pi-moon' : 'pi-sun'"></i>
                </Button>
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