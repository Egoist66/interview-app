<script setup lang="ts">
import { useInterviews } from "@/composables/useInterviews";
import { useInterviewsStore } from "@/stores/interviews";
import { storeToRefs } from "pinia";

const { isLoading, refetchInterviews, isRefetching } = useInterviews();
const {interviews} = storeToRefs(useInterviewsStore())
</script>

<template>
  <div>
    <Button
      :disabled="isRefetching || isLoading"
      :loading="isRefetching"
      @click="refetchInterviews()"
      :label="isRefetching ? 'Обновление...' : 'Обновить'"
      :icon="'pi pi-refresh'"
    />
    <div>
        {{ interviews.length && interviews }}
    </div>
  </div>
</template>

<style scoped></style>
