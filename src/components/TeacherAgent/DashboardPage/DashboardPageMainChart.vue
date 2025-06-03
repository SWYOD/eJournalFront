<script>


import LineChart from "@/components/TeacherAgent/DashboardPage/LineChart.vue";

export default {
  components: { LineChart },
  data() {
    return {
      chartData: {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
        datasets: [
          {
            label: 'Продажи 2023',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80],
            tension: 0.4
          },
        ]
      }
    }
  }
}

</script>

<template>
  <div>
    <h2>Линейный график</h2>
    <LineChart class="chart" :chartData="chartData" />
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>