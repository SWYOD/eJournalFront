<script setup>

import LoginPageFormInput from "@/components/LoginPage/LoginPageFormInput.vue";
import LoginPageFormButton from "@/components/LoginPage/LoginPageFormButton.vue";
import {ref} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import {DefaultApiInstance} from "@/api/index.js";

const name = ref('');
const surname = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

async function handleRegister() {
  if (passwordConfirm.value !== password.value) {
    alert('Пароли не совпадают');
    return;
  }
  try {
    await DefaultApiInstance.post('/students', {
      name: username.value,
      first_name: name.value,
      second_name: surname.value,
      email: email.value,
      password: password.value,
    });
    alert("Регистрация успешна!");
  } catch (error) {
    console.error('Ошибка регистрации:', error);
  }
  await router.push("/");
}

</script>

<template>
  <main class="main-register">
    <form class="register-form" @submit.prevent="handleRegister">
      <img class="logo" src="../../assets/icons/MainLogo.svg" alt="Лого">
      <div class="form-title">Электронный журнал студента</div>
      <div class="input-wrapper">
        <LoginPageFormInput v-model="name" type="text" placeholder="Имя"/>
        <LoginPageFormInput v-model="surname" type="text" placeholder="Фамилия"/>
        <LoginPageFormInput v-model="username" type="text" placeholder="Логин"/>
        <LoginPageFormInput v-model="email" type="text" placeholder="Почта"/>
        <LoginPageFormInput v-model="password" type="password"  placeholder="Пароль"/>
        <LoginPageFormInput v-model="passwordConfirm" type="password"  placeholder="Подтверждение пароля"/>
      </div>
      <div class="buttons-wrapper">
        <LoginPageFormButton text="Вернуться назад" type="button" @click="router.go(-1)"/>
        <LoginPageFormButton text="Зарегистрироваться" type="submit"/>
      </div>
    </form>
  </main>
</template>

<style scoped>
.logo {
  width: 75px;
  height: 75px;
}

.form-title {
  color: #000000;
  font-family: Montserrat;
  font-weight: 450;
  font-size:20px;
  line-height: 44.1px;
}

.main-register{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  background: url("@/assets/icons/gradientBackground.png") no-repeat center center;
  background-size: cover;
  flex-wrap: wrap;
}
.register-form {
  width: 400px;
  height: 500px;
  display: grid;
  gap: 15px;
  grid-template-rows: 2fr 1fr 2fr 1fr;
  grid-template-columns: 1fr;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 0px 43.7px 7px #7D7D7D21;
  justify-items: center;
}

.input-wrapper {
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 15px;
}

.buttons-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
}
.buttons-wrapper button[type="button"] {
  background: transparent;
  border: #98B8CB solid 1px;
}
.buttons-wrapper button[type="button"]:hover {
  background: #7EB8D38C;
}
</style>