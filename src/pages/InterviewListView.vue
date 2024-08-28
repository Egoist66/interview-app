<script setup lang="ts">
import Debug from "@/components/service/Debug.vue";
import { useDev } from "@/composables/useDev";
import { useInterviews } from "@/composables/useInterviews";
import { useInterviewsStore } from "@/stores/interviews";
import { storeToRefs } from "pinia";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import { ref } from "vue";
import { useRouter } from "vue-router";

const {
  isLoading,
  refetchInterviews,
  isRefetching,
  removeInterview,
} = useInterviews();

const { interviews } = storeToRefs(useInterviewsStore());
const router = useRouter();

const filters = ref({
  company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  hrName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  salaryFrom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  result: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  vacancyLink: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  contactPhone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  contactTelegram: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  actions: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const columns = ref([
  { field: "company", header: "Компания" },
  { field: "vacancyLink", header: "Вакансия" },
  { field: "salaryFrom", header: "Зарплата" },
  { field: "result", header: "Статус" },
  { field: "hrName", header: "Имя HR" },
  { field: "contactPhone", header: "Номер телефона" },
  { field: "contactTelegram", header: "Telegram" },
  { field: "actions", header: "Действия" },
]);

const {isDev} = useDev()
</script>

<template>
  <Toast position="bottom-right" />
  <ConfirmDialog />

  <Debug :visible="isDev" :state="interviews" />

  <h1 class="text-2xl mb-5 mt-0">Текущие собеседования</h1>
  <div>
    <div :title="!interviews.length ? 'Нет данных для обновления' : ''">
      <Button
        :title="'Обновить список'"
        class="mb-5"
        :disabled="isRefetching || isLoading || !interviews.length"
        :loading="isRefetching"
        @click="refetchInterviews()"
        :icon="'pi pi-refresh'"
      />
    </div>

    <InlineMessage class="block" v-if="!interviews.length">Данных нет</InlineMessage>
    <DataTable
      v-else
      showGridlines
      :context-menu="true"
      :total-records="interviews.length"
      stripedRows
      row-hover
      :resizable-columns="true"
      v-model:filters="filters"
      filter-display="row"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :column-resize-mode="'fit'"
      removableSort
      :always-show-paginator="true"
      :loading="isLoading || isRefetching"
      :value="interviews.length ? interviews : []"
    >
      <Column
        v-for="(col, i) of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.field !== 'actions'"
        filter
      >
        <template #body="{ data }" v-if="col.field === 'contactPhone'">
          <a class="text-blue-700 flex gap-2" :href="`tel:${data[col.field]}`">
            <span class="pi pi-phone text-blue-500" />
            <span>{{ data[col.field] }}</span>
          </a>
        </template>

        <template #body="{ data }" v-if="col.field === 'salaryFrom'">
          <div v-if="!data.salaryFrom" class="flex gap-2">
            <span class="pi pi-dollar text-blue-500" />
            <span>Не указано</span>
          </div>

          <div v-else class="flex gap-2">
            <span class="pi pi-dollar text-blue-500" />
            <span>{{ data.salaryFrom }} - {{ data.salaryTo }}</span>
          </div>
        </template>

        <template #body="{ data }" v-if="col.field === 'result'">
          <div v-if="!data.result" class="flex gap-2">
            <Badge severity="warning">Ожидание</Badge>
          </div>

          <div v-else class="flex gap-2">
            <Badge :severity="`${data.result === 'Отказ' ? 'danger' : 'success'}`">{{ data[col.field] }}</Badge>
          </div>
        </template>


        <template v-if="col.field === 'vacancyLink'" #body="{ data }">
          <a class="text-blue-700 flex gap-2" :href="data[col.field]" target="_blank">
            <span class="pi pi-link text-blue-500" />
            <span class="underline">Ссылка на вакансию</span>
          </a>
        </template>

        <template v-if="col.field === 'contactTelegram'" #body="{ data }">
          <a
            v-if="data.contactTelegram"
            class="text-blue-700 flex gap-2"
            :href="`https://t.me/${data[col.field]}`"
            target="_blank"
          >
            <span class="pi pi-telegram text-blue-500" />
            <span>{{ data[col.field] }}</span>
          </a>

          <div
            v-else
            class="text-blue-700 flex gap-2"
            target="_blank"
          >
            <span class="pi pi-telegram text-blue-500" />
            <span>Не указан</span>
          </div>
        </template>


        <template v-if="col.field === 'actions'" #body="{ data }">
          <div class="flex gap-2 table-actions align-items-center">
            <Button
              title="Редактировать собеседование"
              :disabled="false"
              class="w-full justify-content-center"
              severity="info"
              @click="router.push({ name: 'interview', params: { id: data.id } })"
            >
              <span :class="'pi pi-pencil'" />
            </Button>

            <Button
              title="Удалить собеседование"
              :disabled="false"
              class="w-full justify-content-center"
              severity="danger"
              @click="removeInterview(data.id)"
            >
              <span :class="'pi pi-trash'" />
            </Button>
          </div>
        </template>

        <template #filter="{ filterModel, field, filterCallback }">
          <InputText
            v-model="filterModel.value"
            v-tooltip.top.focus="'После поиска нажмите Enter'"
            type="text"
            :disabled="field === 'actions'"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.pi {
  font-size: 18px;
}

table.blur {
  filter: blur(3px) !important;
  transition: 0.3s all ease;
}

a:hover {
  color: rgb(1, 135, 230) !important;
}

@media (max-width: 800px) {
  .table-actions {
    flex-wrap: wrap;
  }
}
</style>
