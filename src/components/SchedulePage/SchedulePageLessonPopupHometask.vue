<script setup>
defineProps([
    "title",
    "content"
])
</script>

<template>
  <div class="schedule-lesson-popup-hometask">
    <div class="schedule-lesson-popup-hometask-title">{{title}}</div>
    <div class="schedule-lesson-popup-hometask-content">{{content}}</div>
  </div>
</template>

<style scoped>
.schedule-lesson-popup-hometask {
  background: #FFFFFF;
  border: #98B8CB 1px solid;
}
.schedule-lesson-popup-hometask-title {
  font-weight: 500;
  font-size: 15px;
}
.schedule-lesson-popup-hometask-content {
  font-weight: 400;
  font-size: 10px;
}
</style>