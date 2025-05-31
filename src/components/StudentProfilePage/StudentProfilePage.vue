<script setup>


import SchedulePageHeader from "@/components/SchedulePage/SchedulePageHeader.vue";
import StudentProfilePageMain from "@/components/StudentProfilePage/StudentProfilePageMain.vue";
</script>

<template>
  <div class="grid-wrapper">
    <SchedulePageHeader/>
    <StudentProfilePageMain/>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-rows: 7vh 1fr;
  height: 100%;
  width: 100%;
  background: #ECF5F9;
}

</style>