<script setup lang="ts">
import { useInterviews } from "@/composables/useInterviews";
import { useInterviewsStore } from "@/stores/interviews";
import { storeToRefs } from "pinia";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { isLoading, refetchInterviews, isRefetching, removeInterview } = useInterviews();
const { interviews } = storeToRefs(useInterviewsStore());
const router = useRouter()

const filters = ref({
  company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  hrName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  vacancyLink: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  contactPhone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  contactTelegram: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  actions: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const columns = ref([
  { field: "company", header: "Компания" },
  { field: "vacancyLink", header: "Вакансия" },
  { field: "hrName", header: "Имя HR" },
  { field: "contactPhone", header: "Номер телефона" },
  { field: "contactTelegram", header: "Telegram" },
  { field: "actions", header: "Действия" },
]);
</script>

<template>
  <Toast position="bottom-right" />
  <h1 class="text-2xl mb-5 mt-0">Текущие собеседования</h1>
  <div>
    <Button
      title="Обновить список"
      class="mb-5"
      :disabled="isRefetching || isLoading"
      :loading="isRefetching"
      @click="refetchInterviews()"
      :icon="'pi pi-refresh'"
    />

    <DataTable
      showGridlines
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
      :value="interviews"
    >
      <Column
        v-for="col of columns"
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

        <template v-if="col.field === 'vacancyLink'" #body="{ data }">
          <a class="text-blue-700 flex gap-2" :href="data[col.field]" target="_blank">
            <span class="pi pi-link text-blue-500" />
            <span>{{ data[col.field] }}</span>
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

a:hover {
  color: rgb(1, 135, 230) !important;
}

@media (max-width: 800px) {
  .table-actions {
    flex-wrap: wrap;
  }
}
</style>
