<script setup lang="ts">
import { useInterviewEdit } from "@/composables/useInterviewEdit";
import { useRoute } from "vue-router";

const route = useRoute();
const {
  currentInterview,
  isLoading,
  isRefetching,
  isSaving,
  addStage,
  removeStage,
  saveEdit,
} = useInterviewEdit(route.params.id as string);



const parseTime = (date: Date) => {
  
    return new Date(date.getTime())
  
}
</script>

<template>
  <Toast position="bottom-right" />

  <ProgressBar
    v-if="isLoading"
    mode="indeterminate"
    style="height: 3px; width: 600px; margin: auto"
  />

  <div
    :class="{ saving: isSaving || isRefetching }"
    class="content-currentInterview"
    v-else-if="currentInterview?.id && !isLoading"
  >
    <Card>
      <!-- Edit Form -->
      <template #title>Собеседование в компанию {{ currentInterview?.company }}</template>
      <template #content>

        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <InputText
            class="input mb-3"
            id="company"
            v-model.trim="currentInterview.company"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <InputText
            type="url"
            class="input mb-3"
            id="vacancyLink"
            v-model.trim="currentInterview.vacancyLink"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <InputText
            class="input mb-3"
            id="hrName"
            v-model.trim="currentInterview.hrName"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram никнейм HR</label>
          <InputText
            class="input mb-3"
            id="contactTelegram"
            v-model.trim="currentInterview.contactTelegram"
          />
        </div>

        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <InputText
            class="input mb-3"
            id="contactPhone"
            v-model.trim="currentInterview.contactPhone"
          />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <InputNumber
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от $"
              v-model.trim.number="currentInterview.salaryFrom"
            />
          </div>
          <div class="flex-auto">
            <InputNumber
              inputId="salaryTo"
              placeholder="Зарплатная вилка до $"
              v-model.trim.number="currentInterview.salaryTo"
            />
          </div>
        </div>

        <Button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage()"
        />

        <!-- STAGES -->
        <template v-if="currentInterview.stages">
          <div
            v-animateonscroll="{ enterClass: 'scalein', leaveClass: 'fadeout' }"
            v-for="(stage, index) in currentInterview.stages"
            :key="stage.id"
            class="currentInterview-stage"
          >
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${stage.id}`">Название этапа</label>
              <InputText
                class="input mb-3"
                :id="`stage-name-${stage.id}`"
                v-model.trim="stage.name"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${stage.id}`">Дата прохождения этапа</label>
              <Calendar
                class="input mb-3"
                :id="`stage-date-${stage.id}`"
                showTime
                show-button-bar
                hourFormat="24"
                v-model="stage.date"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${stage.id}`">Комментарий</label>
              <Textarea
                :id="`stage-description-${stage.id}`"
                class="input mb-3"
                rows="5"
                v-model.trim="stage.description"
              />
            </div>
            <Button
              severity="danger"
              label="Удалить этап"
              @click="removeStage(stage.id)"
            />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <RadioButton
              inputId="interviewResult1"
              name="result"
              value="Refusal"
              v-model.trim="currentInterview.result"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              inputId="interviewResult2"
              name="result"
              value="Offer"
              v-model.trim="currentInterview.result"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <Button :disabled="isSaving" :label="isSaving ? 'Обновление...' : 'Сохранить'" icon="pi pi-save" @click="saveEdit()" class="mt-3" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.content-currentInterview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.currentInterview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}

textarea {
  resize: vertical;
}

.saving {
  filter: blur(1px);
  opacity: 0.6;
}
</style>
