<script setup>
import SchedulePageMainScheduleLesson from "@/components/SchedulePage/SchedulePageMainScheduleLesson.vue";
import SchedulePageMainScheduleDayTitle from "@/components/SchedulePage/SchedulePageMainScheduleDayTitle.vue";

defineProps([
    'data'
])
</script>

<template>
  <div class="schedule-day">
    <SchedulePageMainScheduleDayTitle date="17 фев" day="Понедельник"/>
    <SchedulePageMainScheduleLesson/>
  </div>
</template>

<style scoped>
  .schedule-day {
    display: grid;
    grid-template-rows: 35px 1fr;
    border-radius: 15px;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px;
  }
</style>