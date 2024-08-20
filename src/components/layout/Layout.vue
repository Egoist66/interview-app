<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const auth = useAuthStore()
const router = useRouter()


onMounted(() => {
    if(auth.userId.length) {
        router.replace('/')

    }
    
})

</script>

<template>
    <div id="layout">

       
        <div class="container">
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