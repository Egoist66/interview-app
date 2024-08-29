<script setup lang="ts">
import { useStatistics } from "@/composables/useStatistics";

const { chartData, chartOptions } = useStatistics();
</script>

<template>
  <h1 class="text-2xl mb-5 mt-0">Статистика по собеседованиям</h1>
  <div class="card flex justify-content-center">
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-30rem"
    />
  </div>
</template>

<style scoped></style>
