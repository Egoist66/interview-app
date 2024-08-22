<script setup lang="ts">
import { useInterviews } from "@/composables/useInterviews";
import { useInterviewsStore } from "@/stores/interviews";
import { storeToRefs } from "pinia";
import { FilterMatchMode } from 'primevue/api';
import { ref } from "vue";


const { isLoading, refetchInterviews, isRefetching } = useInterviews();
const { interviews } = storeToRefs(useInterviewsStore());

const filters = ref({
    'company': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'hrName': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'vacancyLink': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'contactPhone': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'contactTelegram': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
})

const columns = ref([
    {field: 'company', header: 'Компания'},
    {field: 'hrName', header: 'Имя HR'},
    {field: 'vacancyLink', header: 'Вакансия'},
    {field: 'contactPhone', header: 'Номер телефона'},
    {field: 'contactTelegram', header: 'Telegram'},
]);
</script>

<template>
  <h1 class="text-2xl mb-5 mt-0">Текущие собеседования</h1>
  <div>
    <Button
      class="mb-5"
      :disabled="isRefetching || isLoading"
      :loading="isRefetching"
      @click="refetchInterviews()"
      :label="isRefetching ? 'Обновление...' : 'Обновить'"
      :icon="'pi pi-refresh'"
    />

    <DataTable
       showGridlines
       stripedRows
       v-model:filters="filters"
       filter-display="row"
       paginator :rows="5"
       :rowsPerPageOptions="[5, 10, 20, 50]" 
      :column-resize-mode="'fit'"
      removableSort
      :always-show-paginator="true"
      :loading="isLoading || isRefetching"
      :value="interviews"
    >
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"  sortable filter>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" v-tooltip.top.focus="'После поиска нажмите Enter'" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
