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


onMounted(async () => {
  try {
    const response = await axios.get('https://swyod-ejournal--af55.twc1.net/students/' + localStorage.getItem("userId"));

    username.value = localStorage.getItem("username");
    username.value = response.data.name;
    name.value = response.data.first_name;
    surname.value = response.data.second_name;
    email.value = response.data.email;

  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
 <main class="profile-page-main">
  <div class="profile-page-content-grid">
    <div class="profile-page-cover">
      <div class="profile-page-user-icon">

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
  background: url("@/assets/images/Cover.png") no-repeat center center;
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
}

.profile-page-content {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  gap: 20px;
}
.profile-page-content-username {
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  color: #1E465D;
}
.profile-page-content-data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>