<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, LinearScale,
  PointElement, CategoryScale
} from 'chart.js';

ChartJS.register(
    Title, Tooltip, Legend,
    LineElement, LinearScale,
    PointElement, CategoryScale
);

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartData: Object,
    chartOptions: Object
  },
  computed: {
    modifiedChartData() {
      if (!this.chartData || !this.chartData.datasets) return {};

      // Глубокое клонирование данных
      const data = JSON.parse(JSON.stringify(this.chartData));

      // Добавляем tension:0.4 к каждому датасету
      data.datasets.forEach(dataset => {
        dataset.tension = 0.4;
      });

      return data;
    }
  }
};
</script>

<template>
  <div class="line-chart-container">
    <!-- Используем модифицированные данные -->
    <Line :data="modifiedChartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.line-chart-container {
  height: 100%;
  position: relative;
}
</style>