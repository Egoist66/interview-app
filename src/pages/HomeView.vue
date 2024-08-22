<script setup lang="ts">
import { useInterviewCreate } from '@/composables/useInterviewCreate';


 const {
  company,
  vacancyLink,
  hrName,
  contactTelegram,
  contactWhatsApp,
  contactPhone,
  isCreating,
  createInterview
 } = useInterviewCreate()

</script>

<template>
  <div class="content-interview">
    <Card>
      <template #title>Новое собеседование</template>
      <template #content>
        
        <InputText class="input mb-3" placeholder="Компания" v-model="company" />
        <InputText
          v-model="vacancyLink"
          type="url"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <InputText v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <InputText
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram ник HR"
        />
        <InputText
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <InputText v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <Button
          @click="createInterview()"
          label="Создать собеседование"
          :disabled="false"
          :loading="isCreating"
        ></Button>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
