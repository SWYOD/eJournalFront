<script setup>

import LoginPageFormInput from "@/components/LoginPage/LoginPageFormInput.vue";
import LoginPageFormButton from "@/components/LoginPage/LoginPageFormButton.vue";
import {ref} from "vue";
import axios from "axios";

const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

async function handleRegister() {
  if (passwordConfirm.value !== password.value) {
    alert('Пароли не совпадают');
    return;
  }
  try {
    await axios.post('https://swyod-ejournal--af55.twc1.net/auth/register', {
      username: name.value + " " + surname.value,
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
  }
}

</script>

<template>
  <main class="main-register">
    <form class="login-form" @submit.prevent="handleRegister">
      <img class="logo" src="../../assets/icons/MainLogo.svg" alt="Лого">
      <div class="form-title">Электронный журнал студента</div>
      <div class="input-wrapper">
        <LoginPageFormInput v-model="name" type="text" placeholder="Имя"/>
        <LoginPageFormInput v-model="surname" type="text" placeholder="Фамилия"/>
        <LoginPageFormInput v-model="email" type="text" placeholder="Почта"/>
        <LoginPageFormInput v-model="password" type="password"  placeholder="Пароль"/>
        <LoginPageFormInput v-model="passwordConfirm" type="password"  placeholder="Подтверждение пароля"/>
      </div>
      <div class="buttons-wrapper">
        <LoginPageFormButton text="Зарегистрироваться" type="submit"/>
      </div>
    </form>
  </main>
</template>

<style scoped>

</style>