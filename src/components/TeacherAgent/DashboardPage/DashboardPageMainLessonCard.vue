<script setup>
defineProps({
  lesson: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div :class="['lesson-card', lesson.status || 'inactive']">
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
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #f3f3f3;
  text-align: left;
}

.lesson-card.next {
  border: 1px solid #8eafc3;
  opacity: 0.7;
  .lecture{
    background-color: #d4e1f1;
    color: #114c65;
  }
}
.lesson-card.current {
  background-color: #e6f9ea;
  border: 1px solid #4caf50;
  opacity: 1;
  filter: none;
  .lecture {
    background-color: #c8e6c9;
    color: #256029;
  }
}
.lesson-card.previous {
  background-color: #e6f9ea;
  border: 1px solid #C2C2C2;
  opacity: 0.7;
  filter: blur(1px);
}

.lesson-card.previous > * {
  color: #C2C2C2;
  .lesson-group{
    color: #C2C2C2;
  }
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