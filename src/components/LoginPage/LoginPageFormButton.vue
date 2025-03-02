<script>
export default {
  name: "LoginPageFormButton",
  props: {
    text: String
  }
}
</script>

<template>
  <button class="LoginPageFormButton">{{text}}</button>
</template>

<style scoped>
.LoginPageFormButton {
  border: 1px solid transparent;
  border-radius: 12px;
  color: #1E465D;
  background: #7EB8D38C;
  cursor: pointer;
  height: 35px;
  font-family: Montserrat;
  font-weight: 500;
}
.LoginPageFormButton:hover {
  background: #7EB8D3;
}
</style>