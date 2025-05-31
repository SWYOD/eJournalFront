<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {DefaultApiInstance} from "@/api/index.js";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const username = ref('');
const userIcon = ref('');
const router = useRouter();

const openProfile = () => router.push('/profile');

onMounted(async () => {
  try {
    let response = await DefaultApiInstance.get('/students/' + userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    username.value = localStorage.getItem("username");
    if (response.data.avatar) {
      userIcon.value = response.data.avatar;
    } else {
      userIcon.value = '@/assets/icons/DefaultUserIcon.svg';
    }
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <header class="schedule-header">
    <img class="logo" src="../../assets/icons/MainLogoWhite.svg">
    <div class="user-profile" @click="openProfile">
      <p class="user-name">{{username}}</p>
      <div class="user-icon-wrapper">
        <img class="user-icon" :src="'https://s3.timeweb.cloud/30489bee-ejournal/' + userIcon" alt="Аватар">
      </div>
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
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px;
  }

  .user-profile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
    margin-right: 10px;
    color: #FFFFFF;
  }

  .user-icon {
    border-radius: 50%;
    width: 100%;
    height: auto;
  }

  .user-icon-wrapper {
    width: clamp(15px, 50px, 65px);
    height: clamp(15px, 50px, 65px);
    border-radius: 50%;
    background: #D9D9D9;
    align-content: center;
  }

</style>