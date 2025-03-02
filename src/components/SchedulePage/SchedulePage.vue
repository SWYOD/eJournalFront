<script>
import SchedulePageHeader from "@/components/SchedulePage/SchedulePageHeader.vue";
import SchedulePageMain from "@/components/SchedulePage/SchedulePageMain.vue";

export default {
  name: "SchedulePage",
  components: {SchedulePageMain, SchedulePageHeader},
  methods: {
    getNextWeek(curWeek) {

    },
    getPrevWeek(curWeek) {

    }
  },
  computed: {
    week() {

    }
  }
}
</script>

<template>
  <div class="grid-wrapper">
    <SchedulePageHeader/>
    <SchedulePageMain/>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-rows: 75px 1fr;
  height: 100%;
  width: 100%;
}

.schedule-week-display p {
  margin: 0;
}

</style>