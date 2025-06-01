<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router';
import {DefaultApiInstance} from "@/api/index.js";

const router = useRouter();

const goToSchedule = () => {
  router.push('/schedule');
};
const props = defineProps([
    'name',
    'surname',
    'email'
])

const username = ref('');
const name = ref('');
const surname = ref('');
const email = ref('');
const avatar = ref('');
const cover = ref('');
const bDate = ref('');
const groupname = ref('');


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};



onMounted(async () => {
  try {
    const response = await DefaultApiInstance.get('/students/' + localStorage.getItem("userId"));

    username.value = localStorage.getItem("username");
    username.value = response.data.name;
    name.value = response.data.first_name;
    surname.value = response.data.second_name;
    email.value = response.data.email;
    avatar.value = response.data.avatar;
    cover.value = response.data.cover;
    bDate.value = formatDate(response.data.bDate);
    groupname.value = response.data.group.name;

  } catch (error) {
    console.log(error)
  }

})

</script>

<template>
 <main class="profile-page-main">
  <div class="profile-page-content-grid">
    <div class="profile-page-cover"  :style="{ backgroundImage: `url('https://s3.timeweb.cloud/30489bee-ejournal/${cover}')` }">
      <div class="profile-page-user-icon">
        <img class="avatar" :src="'https://s3.timeweb.cloud/30489bee-ejournal/' + avatar" alt="Аватар">
      </div>
    </div>
    <div class="profile-page-content">
      <div class="profile-page-content-username">
        {{username}}
        <button class="schedule-button" @click="goToSchedule"> К расписанию</button>

      </div>
      <div class="profile-page-content-data">
        <div class="profile-page-content-data-personal-data">
          <h1>Личные данные</h1>
          <div class="profile-page-content-data-personal-data-content">
            <h2>Имя</h2>
            <p>{{name}}</p>
            <h2>Фамилия</h2>
            <p>{{surname}}</p>
            <h2>Дата рождения</h2>
            <p>{{bDate}}</p>
          </div>
        </div>
        <div class="profile-page-content-data-registration-data">
          <h1>Регистрационные данные</h1>
          <div class="profile-page-content-data-registration-data-content">
            <h2>Имя пользователя</h2>
            <p>{{username}}</p>
            <h2>Почта</h2>
            <p>{{email}}</p>
          </div>
        </div>
        <div class="profile-page-content-data-student-data">
          <h1>Данные студента</h1>
          <div class="profile-page-content-data-student-data-content">
            <h2>Группа</h2>
            <p>{{groupname}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
 </main>
</template>

<style scoped>
.profile-page-main{
  padding: 20px;
}
.profile-page-content-grid{
  display: grid;
  grid-template-rows: 200px 1fr;
  height: 100%;
  width: 100%;
  background: #FFFFFF;
  border-radius: calc(40px);
}
.profile-page-cover{
  width: 100%;
  border-top-right-radius: calc(40px);
  border-top-left-radius: calc(40px);
}
.profile-page-user-icon{
  position: relative;
  background: #2C394F;
  border-radius: 100%;
  width: clamp(30px, 200px, 325px);
  height: clamp(30px, 200px, 325px);
  top: 65px;
  left: 50px;
  border: 3px solid #ffffff;
  overflow: hidden;
}

.profile-page-content {
  display: grid;
  grid-template-rows: 3vw 1fr;
  padding: 124px 20px 20px;
  gap: 20px;
}
.profile-page-content-username {
  position: relative;
  height: fit-content;
  font-weight: 400;
  font-size: 96px;
  line-height: 30px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-page-content-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.profile-page-content-data-personal-data{
  display: grid;
  grid-template-rows: 120px 1fr;
}
.profile-page-content-data-registration-data{
  display: grid;
  grid-template-rows: 120px 1fr;
}
.profile-page-content-data-student-data{
  display: grid;
  grid-template-rows: 120px 1fr;
}
.avatar{
  width: 100%;
  height: auto;
}
h1{
  margin: 30px 0px;
  font-weight: 400;
  font-size: 36px;
}
h2{
  font-weight: 400;
  font-size: 24px;
}
p{
  margin-top: 0;
  font-weight: 400;
  font-size: 34px;
}
.schedule-button{
  background-color: #7EB8D380;
  color: #1E465D;
  border: none;
  padding: 10px 20px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 32px;
}
.schedule-button:hover{
  background-color: #7EB8D3C0;
}
</style>