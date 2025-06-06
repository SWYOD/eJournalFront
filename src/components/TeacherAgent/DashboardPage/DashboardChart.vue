<script>
import { ref, onMounted, watch } from 'vue';
import LineChart from "@/components/Charts/LineChart.vue";
import { fetchGroups } from "@/api/GroupApi/group-api.js";
import { fetchGroupAverageMarks } from "@/api/MarkApi/mark-api.js";

export default {
  components: { LineChart },
  setup() {
    const periodLabels = { day: 'День', week: 'Неделя', month: 'Месяц', year: 'Год' };
    const periods = Object.keys(periodLabels);
    const currentPeriodIndex = ref(1);
    const currentPeriod = ref(periods[currentPeriodIndex.value]);
    const currentDate = ref(new Date());

    const groups = ref([]);
    const selectedGroup = ref(null);

    const chartLabels = ref([]);
    const chartValues = ref([]);
    const yTicks = Array.from({ length: 11 }, (_, i) => i * 0.5);

    const dropdownOpen = ref(false);
    const groupDropdownOpen = ref(false);

    const monthWeekLabels = ref([]);
    const monthDayLabels = ref([]);

    async function loadGroups() {
      const res = await fetchGroups();
      groups.value = res.data || [];
      if (!selectedGroup.value && groups.value.length) {
        selectedGroup.value = groups.value[0].id;
      }
    }

    async function loadData() {
      if (!selectedGroup.value) return;

      try {
        const res = await fetchGroupAverageMarks(
            selectedGroup.value,
            currentPeriod.value,
            currentDate.value
        );

        if (currentPeriod.value === 'month') {
          // Обработка иерархической структуры для месяца
          const flatData = [];
          const weekLabels = [];
          const dayLabels = [];

          res.forEach(week => {
            week.days.forEach(day => {
              flatData.push(day.average);
              weekLabels.push(`Неделя ${week.weekNumber}`);
              dayLabels.push(day.dayOfWeek);
            });
          });

          chartValues.value = flatData;
          monthWeekLabels.value = weekLabels;
          monthDayLabels.value = dayLabels;
        } else {
          // Обработка других периодов
          chartLabels.value = res.map(d => d.period);
          chartValues.value = res.map(d => d.average);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    }

    function changePeriod(offset) {
      const date = new Date(currentDate.value);
      switch (currentPeriod.value) {
        case 'day': date.setDate(date.getDate() + offset); break;
        case 'week': date.setDate(date.getDate() + offset * 7); break;
        case 'month': date.setMonth(date.getMonth() + offset); break;
        case 'year': date.setFullYear(date.getFullYear() + offset); break;
      }
      currentDate.value = date;
    }

    function prevPeriod() {
      changePeriod(-1);
    }

    function nextPeriod() {
      changePeriod(1);
    }

    function formatDate(date) {
      switch (currentPeriod.value) {
        case 'day': return date.toLocaleDateString('ru-RU');
        case 'week':
          const start = new Date(date);
          start.setDate(date.getDate() - date.getDay() + 1);
          const end = new Date(start);
          end.setDate(start.getDate() + 6);
          return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        case 'month':
          return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
        case 'year':
          return date.toLocaleDateString('ru-RU', { year: 'numeric' });
        default: return date.toLocaleDateString();
      }
    }

    watch([currentPeriod, selectedGroup, currentDate], loadData);

    onMounted(async () => {
      await loadGroups();
      await loadData();
    });

    return {
      periodLabels,
      currentPeriod,
      currentDate,
      formatDate,
      prevPeriod,
      nextPeriod,
      toggleDropdown: () => dropdownOpen.value = !dropdownOpen.value,
      dropdownOpen,
      selectPeriod: (periodKey) => {
        currentPeriod.value = periodKey;
        currentPeriodIndex.value = periods.indexOf(periodKey);
        dropdownOpen.value = false;
      },
      groups,
      selectedGroup,
      toggleGroupDropdown: () => groupDropdownOpen.value = !groupDropdownOpen.value,
      groupDropdownOpen,
      selectGroup: (groupId) => {
        selectedGroup.value = groupId;
        groupDropdownOpen.value = false;
      },
      chartLabels,
      chartValues,
      yTicks,
      monthWeekLabels,
      monthDayLabels
    };
  },
};
</script>

<template>
  <div class="dashboard-chart">
    <div class="header-controls">
      <h2>Средние оценки по группе</h2>
      <div class="controls">
        <!-- Слайдер периода -->
        <button @click="prevPeriod" aria-label="Previous Period">‹</button>
        <div class="period-selector">
          <button @click="toggleDropdown" class="period-button">
            {{ periodLabels[currentPeriod] }} ({{ formatDate(currentDate) }})
          </button>
          <ul v-if="dropdownOpen" class="dropdown-menu">
            <li v-for="(label, key) in periodLabels" :key="key" @click="selectPeriod(key)">
              {{ label }}
            </li>
          </ul>
        </div>
        <button @click="nextPeriod" aria-label="Next Period">›</button>

        <!-- Выбор группы -->
        <div class="group-selector">
          <button @click="toggleGroupDropdown" class="group-button">⋮</button>
          <ul v-if="groupDropdownOpen" class="dropdown-menu">
            <li v-for="group in groups" :key="group.id" @click="selectGroup(group.id)">
              {{ group.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- График -->
    <line-chart
        :chart-data="{
        labels: currentPeriod === 'month' ? monthDayLabels : chartLabels,
        datasets: [{
          label: 'Средняя оценка',
          data: chartValues,
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
        }]
      }"
        :chart-options="{
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 0.5,
              callback: value => value % 1 === 0 ? value : ''
            }
          },
          x: {
            ticks: {
              callback: function(value, index) {
                if (currentPeriod === 'month') {
                  return `${monthWeekLabels[index]}\n${monthDayLabels[index]}`;
                }
                return this.getLabelForValue(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: items => {
                if (currentPeriod === 'month') {
                  return `Неделя: ${monthWeekLabels[items[0].dataIndex]}`;
                }
                return items[0].label;
              }
            }
          }
        }
      }"
    />
  </div>
</template>

<style scoped>
.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.period-selector, .group-selector {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  background: white;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 100;
  width: 120px;
}

.group-selector .dropdown-menu {
  right: 0;
  width: 200px;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #eee;
}

.period-button, .group-button, button {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  user-select: none;
  color: #333;
  transition: color 0.2s ease;
}

.period-button:hover, .group-button:hover, button:hover {
  color: #007bff;
}
</style>