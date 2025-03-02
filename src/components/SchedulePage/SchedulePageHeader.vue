<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import date from "vue-good-table-next/src/components/types/date.js";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const username = ref('');

onMounted(async () => {
  try {
    let response = await axios.get('https://swyod-ejournal--af55.twc1.net/students/' + userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    username.value = response.data.name;
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <header class="schedule-header">
    <img class="logo" src="../../assets/icons/MainLogoWhite.svg">
    <div class="user-profile">
      <p class="user-name">{{username}}</p>
      <img class="user-icon" src="" alt="Иконка профиля">
    </div>
  </header>
</template>

<style scoped>
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

</style>