<script>
import Schedule from "@/components/Pages/Schedule.vue";
import {StudentsApi} from "@/api/StudentsApi/index.js";

export default {
  name: 'MainPage',
  components: {
    Schedule
  },
  async created() {
    let info = []
    info = await StudentsApi.getStudents()
    console.log(info)
    info.forEach((value , index , array) => {
      const name = (value.name)
    })
  }
}

</script>

<template>
  <div class="main">
    <div class="schedule">
      <Schedule/>
    </div>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  justify-content: center;
}

.schedule{
  display: flex;
  justify-content: center;
}
</style>