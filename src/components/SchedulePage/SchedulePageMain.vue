<script>
import SchedulePageMainSlider from "@/components/SchedulePage/SchedulePageMainSlider.vue";
import SchedulePageMainSchedule from "@/components/SchedulePage/SchedulePageMainSchedule.vue";

export default {
  name: "SchedulePageMain",
  components: {SchedulePageMainSchedule, SchedulePageMainSlider}
}
</script>

<template>
  <main class="schedule-main">
    <SchedulePageMainSlider/>
    <SchedulePageMainSchedule/>
  </main>
</template>

<style scoped>
  .schedule-main {
    display: grid;
    grid-template-rows: 30px 1fr;
    padding: 15px 30px;
    gap: 20px;
    background: #ECF5F9;
  }
</style>