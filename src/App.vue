<script >
import {defineComponent} from "vue";

export default defineComponent({
  components: {
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
