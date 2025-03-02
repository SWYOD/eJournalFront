<script setup>
import SchedulePageMainScheduleDay from "@/components/SchedulePage/SchedulePageMainScheduleDay.vue";

const props = defineProps([
    "week"
]);
</script>

<template>
  <div class="schedule">
    <SchedulePageMainScheduleDay v-for="day in props.week"
                                 :day="day.day"
                                 :date="day.date"
                                 :month="day.month"
                                 :lessons="day.lessons"/>
  </div>
</template>

<style scoped>
  .schedule {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
</style>