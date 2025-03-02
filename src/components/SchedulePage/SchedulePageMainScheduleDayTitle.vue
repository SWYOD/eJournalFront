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
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-items: center;
    background: #ECF5F9;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px inset;
  }
</style>