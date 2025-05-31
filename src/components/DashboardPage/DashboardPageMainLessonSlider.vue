<script setup>

import DashboardPageMainLessonCard from "@/components/DashboardPage/DashboardPageMainLessonCard.vue";
</script>

<template>
  <div class="wrapper">
    <DashboardPageMainLessonCard></DashboardPageMainLessonCard>
    <DashboardPageMainLessonCard></DashboardPageMainLessonCard>
    <DashboardPageMainLessonCard></DashboardPageMainLessonCard>
    <DashboardPageMainLessonCard></DashboardPageMainLessonCard>
  </div>

</template>

<style scoped>
 .wrapper{
   display: flex;
   flex-direction: column;
   gap: 10px;
 }
</style>