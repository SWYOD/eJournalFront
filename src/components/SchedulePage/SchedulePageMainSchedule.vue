<script setup>
import SchedulePageMainScheduleDay from "@/components/SchedulePage/SchedulePageMainScheduleDay.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const timetable = ref([]);
const userGroupId = localStorage.getItem("userGroupId");

onMounted(async () => {
  try {
    const response = await axios.get(
        "https://swyod-ejournal--af55.twc1.net/groups/" + userGroupId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
    )

    timetable.value = response.data.timetables;
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <div class="schedule">
    <SchedulePageMainScheduleDay v-for="day in 5"/>
  </div>
</template>

<style scoped>
  .schedule {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
</style>