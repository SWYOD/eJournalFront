<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginPageFormInput from "@/components/LoginPage/LoginPageFormInput.vue";
import LoginPageFormButton from "@/components/LoginPage/LoginPageFormButton.vue";
import {DefaultApiInstance} from "@/api/index.js";


export default {
  components: {LoginPageFormButton, LoginPageFormInput},
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const response = await DefaultApiInstance.post(`/auth/login`, {
          username: username.value,
          password: password.value,
        });
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('userId', response.data.user.id);
          localStorage.setItem('username', response.data.user.name);
          localStorage.setItem('userGroupId', response.data.user.groupId);
          await router.push('/schedule');
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    };

    const handleRegister = () => {
      router.push('/register');
    }

    return { username, password, handleLogin, handleRegister, router };
  },
};
</script>

<template>
  <main class="main-login">
    <form class="login-form" @submit.prevent="handleLogin">
      <img class="logo" src="../../assets/icons/MainLogo.svg" alt="Лого">
      <div class="form-title">Электронный журнал студента</div>
      <div class="input-wrapper">
        <LoginPageFormInput v-model="username" type="text" placeholder="Логин"/>
        <LoginPageFormInput v-model="password" type="password"  placeholder="Пароль"/>
      </div>
      <div class="buttons-wrapper">
        <LoginPageFormButton text="Регистрация" type="button" @click="handleRegister"/>
        <LoginPageFormButton text="Войти" type="submit"/>
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

.main-login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  background: url("@/assets/icons/gradientBackground.png") no-repeat center center;
  background-size: cover;
  flex-wrap: wrap;
}
.login-form {
  width: 400px;
  height: 300px;
  display: grid;
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
button[type="button"] {
  background: transparent;
  border: #98B8CB solid 1px;
}
</style>