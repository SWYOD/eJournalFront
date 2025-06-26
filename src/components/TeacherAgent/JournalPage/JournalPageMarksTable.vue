<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { DefaultApiInstance } from '@/api';
import { format, startOfWeek, addDays, parseISO, isWithinInterval } from 'date-fns';

const props = defineProps({
  selectedGroup: Object,
  selectedSubject: Object,
  selectedStudent: Object,
  students: Array,
});

// Состояния
const semesterStart = ref(new Date('2025-02-01'));
const semesterEnd = ref(new Date('2025-06-30'));
const currentWeekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }));
const marks = ref([]);
const editing = ref({ studentId: null, date: null, value: null });

// Даты текущей недели
const datesInCurrentWeek = computed(() => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(new Date(currentWeekStart.value), i));
  }
  return dates;
});

// Форматирование даты
const formatDate = (date) => format(date, 'dd.MM');

// Навигация по неделям
const prevWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, -7);
};
const nextWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, 7);
};

// Загрузка оценок
const loadMarks = async () => {
  if (!props.selectedGroup || !props.selectedSubject) return;

  try {
    const dto = {
      startDate: semesterStart.value.toISOString(),
      endDate: semesterEnd.value.toISOString(),
      groupIds: [props.selectedGroup.id],
      subjectIds: [props.selectedSubject.id],
    };

    const response = await DefaultApiInstance.get('/marks/period', { params: dto });
    marks.value = response.data;
  } catch (error) {
    console.error('Ошибка загрузки оценок:', error);
  }
};

// Получение оценки студента за конкретную дату
const getMarkForDate = (studentId, date) => {
  return marks.value.find(mark =>
      mark.studentId === studentId &&
      mark.subjectId === props.selectedSubject?.id &&
      new Date(mark.createdAt).toDateString() === date.toDateString()
  );
};

// Расчет среднего балла для студента
const getStudentAverage = (studentId) => {
  const studentMarks = marks.value.filter(mark =>
      mark.studentId === studentId &&
      mark.subjectId === props.selectedSubject?.id
  );

  if (studentMarks.length === 0) return 0;

  const sum = studentMarks.reduce((total, mark) => total + mark.value, 0);
  return (sum / studentMarks.length).toFixed(2);
};

// Список студентов для отображения
const studentsToShow = computed(() => {
  return props.selectedStudent
      ? [props.selectedStudent]
      : props.students || [];
});

// Редактирование оценки
const startEdit = (studentId, date) => {
  const mark = getMarkForDate(studentId, date);
  editing.value = {
    studentId,
    date,
    value: mark ? mark.value : null
  };
};

const saveMark = async () => {
  if (
      !props.selectedSubject ||
      !editing.value.studentId ||
      editing.value.value === null
  ) return;

  try {
    const dto = {
      studentId: editing.value.studentId,
      subjectId: props.selectedSubject.id,
      value: parseInt(editing.value.value),
      createdAt: editing.value.date.toISOString(),
    };

    await DefaultApiInstance.post('/marks', dto);
    editing.value = { studentId: null, date: null, value: null };
    await loadMarks();
  } catch (error) {
    console.error('Ошибка сохранения оценки:', error);
  }
};

const cancelEdit = () => {
  editing.value = { studentId: null, date: null, value: null };
};

// Наблюдатели
watch(() => [props.selectedGroup, props.selectedSubject], loadMarks, { immediate: true });
watch(() => currentWeekStart.value, loadMarks);
</script>

<template>
  <div class="marks-table-container">
    <div class="week-navigation">
      <button @click="prevWeek">← Пред</button>
      <span>Неделя: {{ formatDate(datesInCurrentWeek[0]) }} - {{ formatDate(datesInCurrentWeek[6]) }}</span>
      <button @click="nextWeek">След →</button>
    </div>

    <div class="table-wrapper">
      <table class="marks-table">
        <thead>
        <tr>
          <th class="fixed-column">Студент</th>
          <th
              v-for="date in datesInCurrentWeek"
              :key="date.toISOString()"
              class="date-header"
          >
            {{ formatDate(date) }}
          </th>
          <th class="fixed-column">Семестр</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in studentsToShow" :key="student.id">
          <td class="fixed-column">
            {{ `${student.first_name} ${student.second_name}` }}
          </td>

          <td
              v-for="date in datesInCurrentWeek"
              :key="date.toISOString()"
              class="mark-cell"
              @dblclick="startEdit(student.id, date)"
          >
            <div
                v-if="!editing.studentId || editing.studentId !== student.id || editing.date?.toISOString() !== date.toISOString()"
                class="mark-value"
            >
              {{ getMarkForDate(student.id, date)?.value || '-' }}
            </div>

            <input
                v-else
                type="number"
                min="1"
                max="5"
                v-model.number="editing.value"
                @blur="saveMark"
                @keyup.enter="saveMark"
                @keyup.esc="cancelEdit"
                autofocus
                class="mark-input"
            />
          </td>

          <td class="fixed-column">
            {{ getStudentAverage(student.id) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.marks-table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.week-navigation {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.table-wrapper {
  flex-grow: 1;
  overflow: auto;
}

.marks-table {
  width: 100%;
  border-collapse: collapse;
}

.marks-table th, .marks-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.marks-table th {
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
}

/* Фиксированные колонки */
.fixed-column {
  position: sticky;
  left: 0;
  background-color: white;
  z-index: 10;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  min-width: 150px;
}

/* Для заголовка фиксированной колонки */
thead .fixed-column {
  z-index: 20;
}

.mark-cell {
  min-width: 80px;
  cursor: pointer;
  position: relative;
  height: 40px;
}

.mark-cell:hover {
  background-color: #f5f5f5;
}

.mark-value {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mark-input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: inherit;
  background: #fffedc;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
}

.date-header {
  min-width: 80px;
}
</style>