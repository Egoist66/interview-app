<script setup lang="ts">
import { useStatistics } from "@/composables/useStatistics";

const { chartData, chartOptions, interviews } = useStatistics();
</script>

<template>
  <h1 class="text-2xl mb-5 mt-0">Статистика по собеседованиям</h1>
  <div class="card flex justify-content-center">
    <Chart
      v-if="interviews.length"
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-30rem"
    />

    <InlineMessage class="block w-full" v-else>Данные по статистике отсутствуют</InlineMessage>
  </div>
</template>

<style scoped></style>
