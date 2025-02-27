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
    <LoginPage/>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
