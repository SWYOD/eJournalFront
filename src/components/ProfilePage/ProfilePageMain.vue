<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

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


onMounted(async () => {
  try {
    const response = await axios.get('https://swyod-ejournal--af55.twc1.net/students/' + localStorage.getItem("userId"));

    username.value = localStorage.getItem("username");
    username.value = response.data.name;
    name.value = response.data.first_name;
    surname.value = response.data.second_name;
    email.value = response.data.email;
    avatar.value = response.data.avatar;
    cover.value = response.data.cover;

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
      </div>
      <div class="profile-page-content-data">
        <div class="profile-page-content-data-name">
          {{name}}
        </div>
        <div class="profile-page-content-data-surname">
          {{surname}}
        </div>
        <div class="profile-page-content-data-email">
          {{email}}
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
  height: fit-content;
  font-weight: 400;
  font-size: 96px;
  line-height: 30px;
  color: #000000;

}
.profile-page-content-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.avatar{
  width: 100%;
  height: auto;
}


</style>