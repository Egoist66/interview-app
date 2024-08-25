<script setup lang="ts">
import { useInterviewEdit } from "@/composables/useInterviewEdit";
import { useRoute } from "vue-router";

const route = useRoute();
const { currentInterview: interview, isLoading } = useInterviewEdit(route.params.id as string);

</script>

<template>
  <ProgressBar
    v-if="isLoading"
    mode="indeterminate"
    style="height: 3px; width: 600px; margin: auto"
  />

  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <Card>
      <template #title>Собеседование в компанию {{ interview?.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <InputText class="input mb-3" id="company" v-model.trim="interview.company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <InputText
            type="url"
            class="input mb-3"
            id="vacancyLink"
            v-model.trim="interview.vacancyLink"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <InputText class="input mb-3" id="hrName" v-model.trim="interview.hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <InputText
            class="input mb-3"
            id="contactTelegram"
            v-model.trim="interview.contactTelegram"
          />
        </div>

        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <InputText
            class="input mb-3"
            id="contactPhone"
            v-model.trim="interview.contactPhone"
          />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <InputNumber
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
              v-model.trim="interview.salaryFrom"
            />
          </div>
          <div class="flex-auto">
            <InputNumber
              inputId="salaryTo"
              placeholder="Зарплатная вилка до"
              v-model.trim="interview.salaryTo"
            />
          </div>
        </div>

        <Button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        />
        <template v-if="interview.stages">
          <div
            v-animateonscroll="{ enterClass: 'scalein', leaveClass: 'fadeout' }"
            v-for="(stage, index) in interview.stages"
            :key="index"
            class="interview-stage"
          >
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <InputText
                class="input mb-3"
                :id="`stage-name-${index}`"
                v-model.trim="stage.name"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <Calendar
                class="input mb-3"
                :id="`stage-date-${index}`"
                showTime
                show-button-bar
                hourFormat="24"
                v-model.trim="stage.date"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <Textarea
                :id="`stage-description-${index}`"
                class="input mb-3"
                rows="5"
                v-model.trim="stage.description"
              />
            </div>
            <Button severity="danger" label="Удалить этап" @click="removeStage" />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <RadioButton
              inputId="interviewResult1"
              name="result"
              value="Refusal"
              v-model.trim="interview.result"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              inputId="interviewResult2"
              name="result"
              value="Offer"
              v-model.trim="interview.result"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <Button label="Сохранить" icon="pi pi-save" @click="saveInterview" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
