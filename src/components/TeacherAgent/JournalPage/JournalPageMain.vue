<template>
  <ResponsiveColumns>
    <!-- Колонка 1: Группы -->
    <template #col-0>
      <div class="column-content">
        <HeaderCell text="Группы" />
        <div v-for="group in groups" :key="group.id">
          <Cell
            :text="group.name"
            :isSelected="selectedGroup?.id === group.id"
            @click="selectGroup(group)"
          />
        </div>
      </div>
    </template>

    <!-- Колонка 2: Предметы -->
    <template #col-1>
      <div class="column-content">
        <HeaderCell text="Предметы" />
        <div v-for="subject in subjects" :key="subject.id">
          <Cell
            :text="subject.name"
            :isSelected="selectedSubject?.id === subject.id"
            @click="selectSubject(subject)"
          />
        </div>
      </div>
    </template>

    <!-- Колонка 3: Студенты -->
    <template #col-2>
      <div class="column-content">
        <HeaderCell text="Студенты" />
        <div v-for="student in students" :key="student.id">
          <Cell
            :text="student.name"
            :isSelected="selectedStudent?.id === student.id"
            @click="selectStudent(student)"
          />
        </div>
      </div>
    </template>

    <!-- Колонка 4: Журнал оценок -->
    <template #col-3>

        <JournalPageMarksTable
          :selected-group="selectedGroup"
          :selected-subject="selectedSubject"
          :selected-student="selectedStudent"
          :students="students"
        />

    </template>
  </ResponsiveColumns>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderCell from "@/components/TeacherAgent/JournalPage/HeaderCell.vue";
import ResponsiveColumns from './ResponsiveColumns.vue';
import Cell from "@/components/TeacherAgent/JournalPage/Cell.vue";
import JournalPageMarksTable from "@/components/TeacherAgent/JournalPage/JournalPageMarksTable.vue";
import { DefaultApiInstance } from "@/api/index.js";

// Состояния данных
const groups = ref([]);
const subjects = ref([]);
const students = ref([]);

// Выбранные элементы
const selectedGroup = ref(null);
const selectedSubject = ref(null);
const selectedStudent = ref(null);

// Получаем ID преподавателя (предполагается, что он доступен)
const teacherId = localStorage.getItem('userId'); // Заменить на реальный ID из системы аутентификации

// Загрузка групп преподавателя
const loadGroups = async () => {
  try {
    const response = await DefaultApiInstance.get(`/teachers/${teacherId}`);
    groups.value = response.data.groups;
  } catch (error) {
    console.error('Ошибка загрузки групп:', error);
  }
};

// Загрузка предметов для выбранной группы
const loadSubjects = async (groupId) => {
  try {
    const response = await DefaultApiInstance.get(`/teachers/${teacherId}`);
    subjects.value = response.data.subjects;
  } catch (error) {
    console.error('Ошибка загрузки предметов:', error);
  }
};

// Загрузка студентов группы
const loadStudents = async (groupId) => {
  try {
    const response = await DefaultApiInstance.get(`/groups/${groupId}`);
    students.value = response.data.students;
  } catch (error) {
    console.error('Ошибка загрузки студентов:', error);
  }
};

// Обработчики выбора
const selectGroup = (group) => {
  selectedGroup.value = group;
  selectedSubject.value = null;
  selectedStudent.value = null;
  loadSubjects(group.id);
  loadStudents(group.id);
};

const selectSubject = (subject) => {
  selectedSubject.value = subject;
};

const selectStudent = (student) => {
  selectedStudent.value = student;
};

// Инициализация при монтировании
onMounted(() => {
  loadGroups();
});


</script>

<style>
.custom-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}
.column-content{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>