<script setup lang="ts">
import { useInterviews } from "@/composables/useInterviews";

const { isLoading, refetchInterviews, isRefetching } = useInterviews();
</script>

<template>
  <div>
    <Button
      :disabled="isRefetching || isLoading"
      :loading="isRefetching"
      @click="refetchInterviews()"
      label="Обновить"
      :icon="'pi pi-refresh'"
    />
  </div>
</template>

<style scoped></style>
