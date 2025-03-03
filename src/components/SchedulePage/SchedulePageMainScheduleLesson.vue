<script setup>
import {EventBus} from "@/event-bus.js";

const props = defineProps([
  'timeStart',
  'timeEnd',
  'classroom',
  'subject',
  'teacher',
  'type',
  'date',
  'day',
  'month'
])

function openPopup() {
  EventBus.emit ('openLessonPopup', {
    'timeStart': props.timeStart,
    'timeEnd': props.timeEnd,
    'classroom': props.classroom,
    'subject': props.subject,
    'teacher': props.teacher,
    'type': props.type,
    'date': props.date,
    'day': props.day,
    'month': props.month
  });
}
</script>

<template>
  <div class="schedule-lesson" @click="openPopup">
    <div class="schedule-lesson-time-wrapper">
      <div class="schedule-lesson-time">{{timeStart + " - " + timeEnd}}</div>
      <div class="schedule-lesson-cabinet">{{"Каб " + classroom}}</div>
    </div>
    <div class="schedule-lesson-title">{{subject}}</div>
    <div class="schedule-lesson-teacher">{{teacher}}</div>
    <div class="schedule-lesson-type-wrapper">
      <div class="schedule-lesson-type">{{type}}</div>
    </div>
  </div>
</template>

<style scoped>
.schedule-lesson {
  display: grid;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  height: 150px;
  border: #98B8CB solid 1px;
  background: #FFFFFF;
  border-radius: 13px;
  padding: 10px;
  gap: 10px;
}
.schedule-lesson:hover {
  box-shadow: #24ADFE 0px 0px 3px 2px;
  transition: 200ms ease box-shadow;
}
.schedule-lesson-time-wrapper {
  display: grid;
  grid-template-columns: 4fr 3fr;
}
.schedule-lesson-time {
  color: #98B8CB;
}

.schedule-lesson-cabinet, .schedule-lesson-title, .schedule-lesson-teacher, .schedule-lesson-type, .schedule-lesson-time {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}

.schedule-lesson-cabinet {
  color: #98B8CB;
  background: #ECF5F9;
  border-radius: 5px;
  border: #98B8CB solid 1px;
  justify-content: center;
}

.schedule-lesson-type-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.schedule-lesson-type {
  color: #98B8CB;
  background: #ECF5F9;
  border-radius: 5px;
  border: #98B8CB solid 1px;
  padding: 0 5px;
}

.schedule-lesson-teacher {
  font-size: 13px;
  font-weight: 600;
}
</style>