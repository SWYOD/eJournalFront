<script>
export default {
  name: "LoginPage"
}
</script>

<template>
  <main class="main-login">
    <div class="login-container">
      <input id="login" type="text" placeholder="Логин">
      <input id="password" type="text" placeholder="Пароль">
      <button id="login-button">Войти</button>
    </div>
  </main>
</template>

<style scoped>
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
.login-container {
  width: 400px;
  height: 300px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 0px 43.7px 7px #7D7D7D21;
}
.login-container input {
  border: 1px solid #98B8CB;
  padding: 10px;
  border-radius: 12px;
  color: #1E465D;
  width: 80%;
  height: 15px;
}
.login-container button {
  border: 1px solid transparent;
  padding: 10px;
  border-radius: 12px;
  color: #1E465D;
  background: #7EB8D38C;
  cursor: pointer;
  width: 50%;
  height: 35px;
}

</style>