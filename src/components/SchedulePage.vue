<script>
import date from "vue-good-table-next/src/components/types/date.js";

export default {
  name: "SchedulePage",
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
    <header class="schedule-header">
      <img class="logo" src="@/assets/icons/MainLogoWhite.svg">
      <div class="user-profile">
        <p class="user-name">Василий пупкин</p>
        <img class="user-icon" src="" alt="Иконка профиля">
      </div>
    </header>
    <main class="schedule-main">
      <div class="schedule-slider-wrapper">
        <div class="schedule-slider">
          <div class="schedule-week-prev" @click="getPrevWeek">
            <img src="@/assets/icons/PrevWeek.svg" alt="<">
          </div>
          <div class="schedule-week-display">
            <p>24.02.25-28.02.25</p>
          </div>
          <div class="schedule-week-next" @click="getNextWeek">
            <img src="@/assets/icons/NextWeek.svg" alt=">">
          </div>
        </div>
      </div>
      <div class="schedule">
        <div v-for="day in days" :key="item" class="schedule-day">
          <div class="schedule-lesson" v-for="lesson in day" :key="item">

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-rows: 75px 1fr;
  height: 100%;
  width: 100%;
}

.schedule-main {
  display: grid;
  grid-template-rows: 40px 1fr;
  padding: 15px 30px;

}

.schedule {
  display: flex;
}

.schedule-header {
  width: 100%;
  background-color: #7EB8D3;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.user-profile {
  display: grid;
  grid-template-columns: 1fr 65px;
  gap: 20px;
  align-items: center;
  margin-right: 10px;
  color: #FFFFFF;
}
.user-icon {
  height: 65px;
  width: 65px;
}

.schedule-slider {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #98B8CB;
  border-radius: 15px;
}
.schedule-slider-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}

.schedule-week-display p {
  margin: 0;
}

.schedule-week-next, .schedule-week-prev {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.schedule-week-next {
  border-left: 1px solid #98B8CB;
}
.schedule-week-prev {
  border-right: 1px solid #98B8CB;
}

</style>