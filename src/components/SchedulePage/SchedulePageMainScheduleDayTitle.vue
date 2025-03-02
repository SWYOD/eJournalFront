<script setup>
defineProps([
    'day',
    'date',
])
</script>

<template>
  <div class="schedule-day-title">
    <div class="schedule-day-week">{{$props.day}}</div>
    <div class="schedule-day-date">{{$props.date}}</div>
  </div>
</template>

<style scoped>
  .schedule-day-title {
    color: #98B8CB;
    display: flex;
    grid-template-columns: 2fr 1fr;
    padding: 0 20px;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    background: #ECF5F9;
    border-radius: 10px;
    border: #98B8CB solid 1px;
  }
</style>