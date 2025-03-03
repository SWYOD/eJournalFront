<script setup>


import SchedulePageHeader from "@/components/SchedulePage/SchedulePageHeader.vue";
import ProfilePageMain from "@/components/ProfilePage/ProfilePageMain.vue";
</script>

<template>
  <div class="grid-wrapper">
    <SchedulePageHeader/>
    <ProfilePageMain/>
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