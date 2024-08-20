<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';


const {subTitleText, linkAccountText, toggleAuth} = useAuth()

</script>

<template>
    <Toast position="bottom-right" />
    <div class="flex justify-content-center p-2">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div class="text-center mb-3">
                <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
                <span class="text-600 font-medium line-height-3">{{ subTitleText }}</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">
                    {{ linkAccountText }}
                </a>
            </div>

            <!-- <form @submit.prevent="submitForm">
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <InputText v-model="email" id="email1" type="email" class="w-full mb-3" />

                <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
                <InputText v-model="password" id="password1" type="password" class="w-full mb-3" />

                <Button :label="submitButtonText" type="submit" icon="pi pi-user" :loading="isLoading"
                    class="w-full"></Button>
            </form> -->
        </div>
    </div>
</template>


<style scoped></style>