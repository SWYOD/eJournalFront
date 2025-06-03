<script setup>

import DashboardPageMainChart from "@/components/TeacherAgent/DashboardPage/DashboardPageMainChart.vue";
import DashboardPageMainMessages from "@/components/TeacherAgent/DashboardPage/DashboardPageMainMessages.vue";
import DashboardPageMainSchedule from "@/components/TeacherAgent/DashboardPage/DashboardPageMainSchedule.vue";
import DashboardPageMainLessonSlider from "@/components/TeacherAgent/DashboardPage/DashboardPageMainLessonSlider.vue";
</script>

<template>
  <div class="grid-container">
    <div class="chart-item">
      <DashboardPageMainChart></DashboardPageMainChart>
    </div>
    <div class="lesson-slider-item">
      <DashboardPageMainLessonSlider></DashboardPageMainLessonSlider>
    </div>
    <div class="schedule-item">
      <DashboardPageMainSchedule></DashboardPageMainSchedule>
    </div>
    <div class="message-item">
      <DashboardPageMainMessages></DashboardPageMainMessages>
    </div>
  </div>
</template>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 колонок равной ширины */
  gap: 20px; /* Отступ между колонками */
  margin: 20px;
}
.chart-item {
  grid-column: span 3;
}
.lesson-slider-item {
  grid-column: span 2;
}
.schedule-item {
  grid-raw: 2;
  grid-column: span 4;
}
.message-item {
  grid-raw: 2;
  grid-column: span 1;
}

.chart-item, .lesson-slider-item, .schedule-item, .message-item{
  background: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 1.38rem;
}

</style>