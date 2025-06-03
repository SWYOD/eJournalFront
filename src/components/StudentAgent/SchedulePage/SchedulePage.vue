<script setup>

import SchedulePageMain from "@/components/StudentAgent/SchedulePage/SchedulePageMain.vue";
import StudentUIHeader from "@/components/Headers/StudentUIHeader.vue";

</script>

<template>
  <div class="grid-wrapper">
    <StudentUIHeader/>
    <SchedulePageMain/>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-rows: 7vh 1fr;
  height: 100%;
  width: 100%;
}

.schedule-week-display p {
  margin: 0;
}

</style>