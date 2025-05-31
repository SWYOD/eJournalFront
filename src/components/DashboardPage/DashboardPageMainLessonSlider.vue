<script setup>

import DashboardPageMainLessonCard from "@/components/DashboardPage/DashboardPageMainLessonCard.vue";
const lessons = [
  {
    id: 1,
    group: 'ТЭО 31',
    title: 'Проектирование, разработка и оптимизация веб-приложений',
    subtitle: 'Деревья и их применение в программировании',
    type: 'Лекция',
    time: '08:00 – 09:45',
    isCurrent: false,
    isPrevious: true,
  },
  {
    id: 2,
    group: 'ТЭО 31',
    title: 'Проектирование, разработка и оптимизация...',
    subtitle: 'Какая то там тема',
    type: 'Лекция',
    time: '09:45 – 10:30',
    isCurrent: true,
    isPrevious: false,
  },
  {
    id: 3,
    group: 'ТЭО 31',
    title: 'Проектирование, разработка и оптимизация...',
    subtitle: 'Какая то там тема',
    type: 'Лекция',
    time: '10:30 – 11:50',
    isCurrent: false,
    isPrevious: false,
  },
]

</script>

<template>
  <div class="wrapper">
    <DashboardPageMainLessonCard
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
    />
  </div>

</template>

<style scoped>
 .wrapper{
   display: flex;
   flex-direction: column;
   /*gap: 10px;*/
 }
</style>