<script setup>
import SchedulePageMainScheduleLesson from "@/components/StudentAgent/SchedulePage/SchedulePageMainScheduleLesson.vue";
import SchedulePageMainScheduleDayTitle from "@/components/StudentAgent/SchedulePage/SchedulePageMainScheduleDayTitle.vue";

const props = defineProps([
    'day',
    'date',
    'month',
    'lessons'
])
</script>

<template>
  <div class="schedule-day">
    <SchedulePageMainScheduleDayTitle
        :date="props.date + ' ' + props.month"
        :day="props.day"/>
    <div class="schedule-lessons-wrapper">
      <SchedulePageMainScheduleLesson
          v-for="lesson in props.lessons"
          :classroom="lesson.classroom"
          :teacher="lesson.teacher"
          :time-start="lesson.timeStart"
          :time-end="lesson.timeEnd"
          :subject="lesson.subjectName"
          :type="lesson.subjectType"
          :date="props.date"
          :day="props.day"
          :month="props.month"
      />
    </div>
  </div>
</template>

<style scoped>
  .schedule-day {
    display: grid;
    gap: 10px;
    grid-template-rows: 35px 1fr;
    border-radius: 15px;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px;
  }
  .schedule-lessons-wrapper {
    display: grid;
    grid-auto-rows: min-content;
    gap: 10px;
  }
</style>