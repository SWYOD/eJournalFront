<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('https://swyod-ejournal--af55.twc1.net/api#/Authentication/AuthController_login', {
          username: username.value,
          password: password.value,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          await router.push('/schedule');
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    };

    return { username, password, handleLogin };
  },
};
</script>

<template>
  <main class="main-login">
    <form class="login-form" @submit.prevent="handleLogin">
      <img class="logo" src="@/assets/icons/MainLogo.svg" alt="Лого">
      <div class="form-title">Электронный журнал студента</div>
      <div class="input-wrapper">
        <input v-model="username" type="text" placeholder="Логин">
        <input v-model="password" type="password" placeholder="Пароль">
      </div>
      <div class="buttons-wrapper">
        <button id="register-button">Регистрация</button>
        <button id="login-button" type="submit">Войти</button>
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

.login-form input {
  border: 1px solid #98B8CB;
  padding: 10px;
  border-radius: 12px;
  color: #1E465D;
  height: 15px;
  font-weight: 500;
  font-family: Montserrat;
}
#login-button {
  border: 1px solid transparent;
  border-radius: 12px;
  color: #1E465D;
  background: #7EB8D38C;
  cursor: pointer;
  height: 35px;
  font-family: Montserrat;
  font-weight: 500;
}
#register-button {
  border: 1px solid #98B8CB;
  color: #1E465D;
  border-radius: 12px;
  cursor: pointer;
  height: 35px;
  font-family: Montserrat;
  font-weight: 500;
}
#register-button:hover, #login-button:hover {
  background: #7EB8D3;
}
.buttons-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
}

</style>