<template>
  <div class="dashboard-chart">
    <div class="chart-header">
      <h2>Успеваемость</h2>
      <div class="controls">
        <div class="period-controls">
          <button @click="changePeriod(-1)">←</button>
          <div class="period-selector" @click="showPeriodMenu = !showPeriodMenu">
            {{ periodLabels[selectedPeriod] }}
            <div v-if="showPeriodMenu" class="period-menu">
              <div
                  v-for="(label, key) in periodLabels"
                  :key="key"
                  @click="setPeriod(key)"
              >
                {{ label }}
              </div>
            </div>
          </div>
          <button @click="changePeriod(1)">→</button>
        </div>
        <button class="settings-button" @click="showSettingsPopup = true">⋮</button>
      </div>
    </div>

    <LineChart
        :chart-data="chartData"
        :options="chartOptions"
        v-if="chartData && chartData.labels.length"
    />
    <div v-else class="no-data">Нет данных для отображения</div>

    <DashboardChartSettingsPopup
        v-if="showSettingsPopup"
        :groups="groups"
        :subjects="subjects"
        :initialSelectedGroups="selectedGroups"
        :initialSelectedSubjects="selectedSubjects"
        @close="showSettingsPopup = false"
        @apply="applySettings"
    />
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart.vue';
import DashboardChartSettingsPopup from './DashboardChartSettingsPopup.vue';
import MarksApi from '@/api/MarkApi/mark-api';
import SubjectApi from "@/api/SubjectApi/subject-api.js";
import * as GroupApi from "@/api/GroupApi/group-api.js";


export default {
  components: {
    LineChart,
    DashboardChartSettingsPopup
  },
  data() {
    return {
      selectedPeriod: 'week',
      currentDate: new Date(),
      showPeriodMenu: false,
      showSettingsPopup: false,
      selectedGroups: [],
      selectedSubjects: [],
      groups: [],
      subjects: [],
      chartData: null,
      periodLabels: {
        day: 'День',
        week: 'Неделя',
        month: 'Месяц',
        year: 'Год'
      }
    };
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 0.5,
              callback: value => value % 1 === 0 ? value : ''
            }
          }
        }
      };
    }
  },
  async mounted() {
    await this.fetchGroups();
    await this.fetchSubjects();
    this.loadInitialSelections();
    await this.fetchChartData();
  },
  methods: {
    async fetchGroups() {
      try {
        this.groups = await GroupApi.fetchGroups();
      } catch (error) {
        console.error('Ошибка загрузки групп:', error);
      }
    },
    async fetchSubjects() {
      try {
        this.subjects = await SubjectApi.fetchSubjects();
      } catch (error) {
        console.error('Ошибка загрузки предметов:', error);
      }
    },
    loadInitialSelections() {
      if (this.groups.length > 0) {
        this.selectedGroups = [this.groups[0].id];
      }
      if (this.subjects.length > 0) {
        this.selectedSubjects = [this.subjects[0].id];
      }
    },
    async fetchChartData() {
      const periodData = this.getPeriodDates();

      const params = {
        startDate: periodData.start.toISOString(),
        endDate: periodData.end.toISOString(),
        groupIds: this.selectedGroups,
        subjectIds: this.selectedSubjects
      };

      try {
        const marks = await MarksApi.getMarksByPeriod(params);
        this.processMarks(marks);
      } catch (error) {
        console.error('Ошибка загрузки оценок:', error);
      }
    },
    getPeriodDates() {
      const start = new Date(this.currentDate);
      const end = new Date(this.currentDate);

      switch (this.selectedPeriod) {
        case 'day':
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          break;
        case 'week':
          start.setDate(start.getDate() - start.getDay() + 1); // Понедельник
          end.setDate(start.getDate() + 6); // Воскресенье
          end.setHours(23, 59, 59, 999);
          break;
        case 'month':
          start.setDate(1);
          end.setMonth(end.getMonth() + 1, 0);
          end.setHours(23, 59, 59, 999);
          break;
        case 'year':
          start.setMonth(0, 1);
          end.setMonth(11, 31);
          end.setHours(23, 59, 59, 999);
          break;
      }

      return { start, end };
    },
    processMarks(marks) {
      switch (this.selectedPeriod) {
        case 'day':
          this.prepareDayData(marks);
          break;
        case 'week':
          this.prepareWeekData(marks);
          break;
        case 'month':
          this.prepareMonthData(marks);
          break;
        case 'year':
          this.prepareYearData(marks);
          break;
      }
    },
    prepareDayData(marks) {
      // Группировка по часам (8-20)
      const hours = Array(13).fill(0).map((_, i) => i + 8);
      const hourSums = Array(13).fill(0);
      const hourCounts = Array(13).fill(0);

      marks.forEach(mark => {
        const hour = new Date(mark.createdAt).getHours();
        const index = hours.indexOf(hour);
        if (index !== -1) {
          hourSums[index] += mark.value;
          hourCounts[index]++;
        }
      });

      const averages = hours.map((hour, i) =>
          hourCounts[i] ? (hourSums[i] / hourCounts[i]) : 0
      );

      this.chartData = {
        labels: hours.map(h => `${h}:00`),
        datasets: [{
          label: 'Средняя оценка',
          data: averages,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
    },
    prepareWeekData(marks) {
      const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const daySums = Array(7).fill(0);
      const dayCounts = Array(7).fill(0);

      marks.forEach(mark => {
        const dayIndex = new Date(mark.createdAt).getDay();
        // Преобразование: 0 (Вс) -> 6, 1 (Пн) -> 0, 2 (Вт) -> 1, и т.д.
        const adjustedIndex = (dayIndex + 6) % 7;
        daySums[adjustedIndex] += mark.value;
        dayCounts[adjustedIndex]++;
      });

      const averages = days.map((_, i) =>
          dayCounts[i] ? (daySums[i] / dayCounts[i]) : 0
      );

      this.chartData = {
        labels: days,
        datasets: [{
          label: 'Средняя оценка',
          data: averages,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
    },
    prepareMonthData(marks) {
      // Сложная логика для месячного графика с неделями
      const now = new Date();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const weekStarts = [];

      // Определяем начало недель
      for (let day = 1; day <= daysInMonth; day += 7) {
        weekStarts.push(day);
      }

      const labels = [];
      const weekLabels = [];
      const data = [];

      // Для каждой недели
      weekStarts.forEach((startDay, weekIndex) => {
        const weekEnd = Math.min(startDay + 6, daysInMonth);
        weekLabels.push(`Неделя ${weekIndex + 1} (${startDay}-${weekEnd})`);

        // Для каждого дня недели
        for (let day = startDay; day <= weekEnd; day++) {
          labels.push(day.toString());

          // Рассчет среднего для дня
          const dayMarks = marks.filter(mark => {
            const markDate = new Date(mark.createdAt);
            return markDate.getDate() === day;
          });

          const avg = dayMarks.length
              ? dayMarks.reduce((sum, m) => sum + m.value, 0) / dayMarks.length
              : 0;

          data.push(avg);
        }
      });

      this.chartData = {
        labels,
        datasets: [{
          label: 'Средняя оценка',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
    },
    prepareYearData(marks) {
      const months = [
        'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
      ];

      const monthSums = Array(12).fill(0);
      const monthCounts = Array(12).fill(0);

      marks.forEach(mark => {
        const month = new Date(mark.createdAt).getMonth();
        monthSums[month] += mark.value;
        monthCounts[month]++;
      });

      const averages = months.map((_, i) =>
          monthCounts[i] ? (monthSums[i] / monthCounts[i]) : 0
      );

      this.chartData = {
        labels: months,
        datasets: [{
          label: 'Средняя оценка',
          data: averages,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
    },
    changePeriod(direction) {
      const periodMap = {
        day: () => this.currentDate.setDate(this.currentDate.getDate() + direction),
        week: () => this.currentDate.setDate(this.currentDate.getDate() + direction * 7),
        month: () => this.currentDate.setMonth(this.currentDate.getMonth() + direction),
        year: () => this.currentDate.setFullYear(this.currentDate.getFullYear() + direction)
      };

      if (periodMap[this.selectedPeriod]) {
        periodMap[this.selectedPeriod]();
        this.fetchChartData();
      }
    },
    setPeriod(period) {
      this.selectedPeriod = period;
      this.currentDate = new Date(); // Сброс к текущей дате
      this.showPeriodMenu = false;
      this.fetchChartData();
    },
    applySettings(settings) {
      this.selectedGroups = settings.groups;
      this.selectedSubjects = settings.subjects;
      this.fetchChartData();
    }
  }
};
</script>

<style scoped>
.dashboard-chart {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.period-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.period-controls button {
  padding: 6px 12px;
  background: #f8f8f8;
  border: none;
  cursor: pointer;
}

.period-selector {
  position: relative;
  padding: 6px 12px;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
}

.period-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 10;
}

.period-menu div {
  padding: 8px;
  cursor: pointer;
}

.period-menu div:hover {
  background: #f0f0f0;
}

.settings-button {
  padding: 6px 12px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #999;
}
</style>