<script setup>

import StudentProfilePageMain from "@/components/StudentAgent/StudentProfilePage/StudentProfilePageMain.vue";
import StudentUIHeader from "@/components/Headers/StudentUIHeader.vue";
</script>

<template>
  <div class="grid-wrapper">
    <StudentUIHeader/>
    <StudentProfilePageMain/>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-rows: 7vh 1fr;
  height: 100%;
  width: 100%;
  background: #ECF5F9;
}

</style>