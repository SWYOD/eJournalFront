<template>
  <div class="line-chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: {
    chartData: Object,
    options: Object
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chartInstance) {
          this.chartInstance.data = newData;
          this.chartInstance.update();
        } else {
          this.renderChart();
        }
      },
      deep: true
    },
    options: {
      handler(newOptions) {
        if (this.chartInstance) {
          this.chartInstance.options = newOptions;
          this.chartInstance.update();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  methods: {
    renderChart() {
      if (!this.chartData) return;

      const ctx = this.$refs.chartCanvas.getContext('2d');

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          ...this.options,
          plugins: {
            tooltip: {
              callbacks: {
                title: (items) => {
                  return `День ${items[0].label}`;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                callback: (value, index) => {
                  // Для месячного режима показываем только начало недели
                  if (this.$parent.selectedPeriod === 'month') {
                    const weekStarts = this.$parent.weekStarts || [];
                    if (weekStarts.includes(parseInt(this.chartData.labels[index]))) {
                      return `Неделя ${weekStarts.indexOf(parseInt(this.chartData.labels[index])) + 1}`;
                    }
                    return '';
                  }
                  return this.chartData.labels[index];
                }
              }
            },
            y: this.options.scales.y
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.line-chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>