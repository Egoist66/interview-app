<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useGoogleAuth } from "@/composables/useGoogleAuth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const {
  subTitleText,
  linkAccountText,
  submitButtonText,
  email,
  isLogin,
  isLoading,
  password,
  submitForm,
  toggleAuth,
} = useAuth();

const { authViaGoogle } = useGoogleAuth();



</script>

<template>
  <Toast position="bottom-right" />
  <div class="flex justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3">{{ subTitleText }}</span>
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="toggleAuth"
        >
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm()">
        <FloatLabel class="mb-5">
          <InputText v-model="email" id="email1" type="email" class="w-full" />
          <label for="email1">Email</label>
        </FloatLabel>

        <FloatLabel class="mb-5">
          <Password
            v-if="!isLogin"
            id="password1"
            class="w-full"
            v-model="password"
            toggleMask
          />
          <Password
            v-else
            :feedback="false"
            toggleMask
            v-model="password"
            id="password1"
            type="password"
            class="w-full"
          />
          <label for="password1">Пароль</label>
        </FloatLabel>

        <div
          class="w-full"
          v-tooltip.bottom="!email || !password ? 'Заполните все поля!' : ''"
        >
          <Button
            :disabled="isLoading || !email || !password"
            :label="isLoading ? 'Обработка...' : submitButtonText"
            type="submit"
            icon="pi pi-user"
            :loading="isLoading"
            class="w-full"
          ></Button>
        </div>

        <a
          class="font-medium no-underline hover:text-blue-700 block mt-3 text-blue-500 cursor-pointer"
          @click="authViaGoogle()"
        >
          Авторизация через Google
        </a>
      </form>
    </div>
  </div>
</template>

<style lang="css">
input.p-inputtext {
  width: 100% !important;
}
</style>
