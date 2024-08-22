<script setup lang="ts">
import { useInterviewCreate } from "@/composables/useInterviewCreate";
import { computed } from "vue";

const {
  company,
  vacancyLink,
  hrName,
  contactTelegram,
  contactPhone,
  isCreating,
  disabledCreateButton,
  createInterview,
} = useInterviewCreate();
</script>

<template>
  <div class="content-interview">
    <Toast position="bottom-right" />

    <Card>
      <template #title>Новое собеседование</template>
      <template #content>
        <form @submit.prevent="createInterview()">
          <InputText class="input mb-3" placeholder="Компания" v-model.trim="company" />
          <InputText
            v-model.trim="vacancyLink"
            type="url"
            class="input mb-3"
            placeholder="Описание вакансии (ссылка)"
          />
          <InputText v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
          <InputText
            v-model.trim="contactTelegram"
            class="input mb-3"
            placeholder="Telegram ник HR"
          />
         
          <InputText
            v-model.trim="contactPhone"
            class="input mb-3"
            placeholder="Телефон HR"
          />
          <div v-tooltip.bottom="!company.length || !vacancyLink.length || !hrName.length ? 'Обязательные поля - компания, вакансия, контакт' : ''"
          >
            <Button
              type="submit"
              label="Создать собеседование"
              :disabled="disabledCreateButton"
              :loading="isCreating"
          > </Button>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: 0 auto;
}
</style>
