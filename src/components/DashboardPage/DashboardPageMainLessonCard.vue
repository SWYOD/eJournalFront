<script setup>
defineProps({ lesson: Object })
</script>

<template>
  <div :class="['lesson-card',
    lesson.isCurrent ? 'current' : 'inactive',
    lesson.isPrevious ? 'previous' : '']">
    <div class="lesson-header">
      <span class="lesson-group">{{ lesson.group }}</span>
      <span class="lesson-time">{{ lesson.time }}</span>
    </div>
    <div class="lesson-title">{{ lesson.title }}</div>
    <div class="lesson-subtitle">{{ lesson.subtitle }}</div>
    <span :class="['lesson-type', lesson.type === 'Лекция' ? 'lecture' : '']">
      {{ lesson.type }}
    </span>
  </div>
</template>

<style scoped>

.lesson-card {
  border-radius: 12px;
  border: 1px solid #98B8CB;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #f3f3f3;
  opacity: 0.5;
  filter: blur(1px);
  transform: scale(80%);
  text-align: left;
}

.lesson-card.current {
  background-color: #e6f9ea;
  border: 1px solid #4caf50;
  opacity: 1;
  filter: none;
  transform: scale(100%);
}
.lesson-card.previous {
  background-color: #e6f9ea;
  border: 1px solid #C2C2C2;
  opacity: 0.5;
  filter: blur(1px);
  transform: scale(80%);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
}

.lesson-group {
  font-weight: bold;
  color: #4caf50;
}

.lesson-time {
  color: #666;
}

.lesson-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.lesson-subtitle {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.lesson-type {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 12px;
}

.lecture {
  background-color: #c8e6c9;
  color: #256029;
}
</style>