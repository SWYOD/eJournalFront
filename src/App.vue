<script >
import {defineComponent} from "vue";
import MainPage from "@/components/Pages/MainPage.vue";
import LoginPage from "@/components/LoginPage.vue";

export default defineComponent({
  components: {
    MainPage,
    LoginPage
  }
})

</script>

<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: Montserrat;
}

.wrapper {
  height: 100%;
  width: 100%;
}

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-VariableFont_wght.ttf') format('truetype');
}

</style>
