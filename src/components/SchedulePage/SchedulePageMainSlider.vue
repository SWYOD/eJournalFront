<script setup>
import {onMounted, ref} from "vue";

const weekFriday = Date;
const weekString = ref('');

function changeWeek(date = new Date()) {
  const day = date.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  weekString.value = `${monday.getDate()}.${monday.getMonth() + 1}.${monday.getFullYear()} - ${friday.getDate()}.${friday.getMonth() + 1}.${friday.getFullYear()}`
  weekFriday.value = friday;

}

onMounted(async () => {
  const date = new Date();
  changeWeek(date);
})

const getPrevWeek = () => {
  const year = weekFriday.value.getFullYear();
  const month = weekFriday.value.getMonth();
  const day = weekFriday.value.getDate() - 6;
  const date = new Date(year, month, day);
  changeWeek(date);
}
const getNextWeek = () => {
  const year = weekFriday.value.getFullYear();
  const month = weekFriday.value.getMonth();
  const day = weekFriday.value.getDate() + 3;
  const date = new Date(year, month, day);
  changeWeek(date);
}

</script>

<template>
  <div class="schedule-slider-wrapper">
    <div class="schedule-slider">
      <div class="schedule-week-prev" @click="getPrevWeek">
        <img src="../../assets/icons/PrevWeek.svg" alt="<">
      </div>
      <p class="schedule-week-display">{{ weekString }}</p>
      <div class="schedule-week-next" @click="getNextWeek">
        <img src="../../assets/icons/NextWeek.svg" alt=">">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .schedule-slider {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    place-items: center;
    border: 1px solid #98B8CB;
    border-radius: 15px;
    height: 100%;
  }
  .schedule-slider-wrapper {
    width: 250px;
    height: 30px;
  }
  .schedule-week-next, .schedule-week-prev {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  .schedule-week-display {
    margin: 0;
  }
  .schedule-week-next {
    border-left: 1px solid #98B8CB;
  }
  .schedule-week-prev {
    border-right: 1px solid #98B8CB;
  }
</style>