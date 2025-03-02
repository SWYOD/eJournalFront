<script setup>

import SchedulePageMainSlider from "@/components/SchedulePage/SchedulePageMainSlider.vue";
import SchedulePageMainSchedule from "@/components/SchedulePage/SchedulePageMainSchedule.vue";
import {computed, ref} from "vue";

const week = ref('');
const getWeek = computed(() => week.value);

function changeWeek(newWeek) {
  week.value = newWeek
}

</script>

<template>
  <main class="schedule-main">
    <SchedulePageMainSlider @changeWeek="changeWeek($event)"/>
    <SchedulePageMainSchedule :week="getWeek"/>
  </main>
</template>

<style scoped>
  .schedule-main {
    display: grid;
    grid-template-rows: 30px 1fr;
    padding: 15px 30px;
    gap: 20px;
    background: #ECF5F9;
  }
</style>