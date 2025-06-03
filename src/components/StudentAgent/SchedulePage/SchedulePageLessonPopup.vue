<script setup>
import { directive as vClickOutside } from 'vue3-click-away';
import {onBeforeUnmount, onMounted, ref} from "vue";
import {EventBus} from "@/event-bus.js";

const isOpen = ref(false);
const date = ref('');
const day = ref('');
const month = ref('');
const timeStart = ref('');
const timeEnd = ref('');
const subject = ref('');
const hometask = ref('');

const closePopup = () => {
  isOpen.value = false;
};

const handleOpen = (payload) => {
  isOpen.value = true;
  date.value = payload.date;
  day.value = payload.day;
  month.value = payload.month;
  timeStart.value = payload.timeStart;
  timeEnd.value = payload.timeEnd;
  subject.value = payload.subject;
  hometask.value = payload.hometask;
}

onMounted(() => {
  EventBus.on('openLessonPopup', handleOpen);
})
onBeforeUnmount(() => {
  EventBus.off('openLessonPopup', handleOpen);
})
</script>

<template>
  <div class="schedule-lesson-popup" v-if="isOpen" v-click-outside="closePopup">
    <div class="schedule-lesson-popup-title">
      <div class="schedule-lesson-popup-date">{{day + " " + date + " " + month}}</div>
      <div class="schedule-lesson-popup-time">{{timeStart + " - " + timeEnd}}</div>
    </div>
    <div class="schedule-lesson-popup-subject">{{subject}}</div>
    <div class="schedule-lesson-popup-hometask-grid">

    </div>
  </div>
</template>

<style scoped>
.schedule-lesson-popup {
  position: absolute;
  left: 25%;
  width: 50%;
  display: grid;
  gap: 20px;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 30px 10px;
  animation: slideIn 0.3s ease-out;
}

.schedule-lesson-popup-title {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #98B8CB;
  grid-template-columns: 2fr 1fr;
  padding: 10px;
  align-content: center;
  flex-wrap: wrap;
  background: #ECF5F9;
  border-radius: 12px;
  border: #98B8CB solid 1px;
}

.schedule-lesson-popup-subject {
  font-weight: 500;
}

.schedule-lesson-popup-hometask-grid {
  display: grid;
}

@keyframes slideIn {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>