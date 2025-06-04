<script>
import DashboardPageMainLessonCard from "@/components/TeacherAgent/DashboardPage/DashboardPageMainLessonCard.vue";
import { DefaultApiInstance } from "@/api/index.js";

export default {
  components: { DashboardPageMainLessonCard },
  data() {
    return {
      lessons: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    /*rotateLessons() {
      if (this.lessons.length < 2) return;

      const newLessons = JSON.parse(JSON.stringify(this.lessons));
      const currentIndex = newLessons.findIndex(l => l.status === 'current');
      const nextIndex = newLessons.findIndex(l => l.status === 'next');
      const prevIndex = newLessons.findIndex(l => l.status === 'previous');

      if (currentIndex === -1 || nextIndex === -1 || prevIndex === -1) {
        this.initStatuses(newLessons);
        return;
      }

      newLessons[prevIndex].status = 'next';
      newLessons[currentIndex].status = 'previous';
      newLessons[nextIndex].status = 'current';

      this.lessons = newLessons;
    },*/
    async fetchLessons(teacherId, page = 1, limit = 3) {
      try {
        const response = await DefaultApiInstance.get(`/timetables?page=${page}&limit=${limit}&teacherId=${teacherId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
    },

    transformApiData(apiData) {
      if (!apiData?.data) return this.generateEmptyLessons();

      // Преобразуем данные с сервера
      const serverLessons = apiData.data.map(lesson => ({
        id: lesson.id,
        group: lesson.group?.name || 'Не указана',
        title: lesson.subject?.name || 'Без названия',
        subtitle: lesson.description || 'Без описания',
        type: lesson.subject?.type || 'Занятие',
        time: `${this.formatTime(lesson.subjDate)} – ${this.formatTime(lesson.endDate)}`,
        status: this.validateStatus(lesson.status) // Валидируем статус
      }));

      // Если уроков с сервера достаточно, возвращаем их
      if (serverLessons.length >= 3) {
        return serverLessons.slice(0, 3); // Берем первые 3 элемента
      }

      // Если уроков меньше 3, дополняем пустыми
      return [...serverLessons, ...this.generateEmptyLessons(3 - serverLessons.length)];
    },

    generateEmptyLessons(count = 3) {
      return Array.from({ length: count }, (_, i) => ({
        id: -i,
        group: 'Нет данных',
        title: 'Нет занятий',
        subtitle: '',
        type: '',
        time: '',
        status: ['current', 'next', 'previous'][i] || 'next'
      }));
    },

    validateStatus(status) {
      const validStatuses = ['current', 'next', 'previous'];
      return validStatuses.includes(status) ? status : 'next';
    },

    formatTime(dateString) {
      if (!dateString) return '';

      try {
        const normalizedDate = dateString.includes('T')
            ? dateString
            : dateString.replace(' ', 'T') + 'Z';

        const date = new Date(normalizedDate);
        return date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Moscow'
        });
      } catch (e) {
        console.error('Error formatting time:', dateString, e);
        return '--:--';
      }
    }
  },
  async created() {
    this.isLoading = true;
    try {
      const teacherId = localStorage.getItem('userId');
      const apiData = await this.fetchLessons(teacherId);
      this.lessons = this.transformApiData(apiData);
    } catch (error) {
      this.error = error.message;
      this.lessons = this.transformApiData({ data: [] });
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <button @click="rotateLessons">Пролистать</button>
    <div class="carousel-container">
      <transition-group name="slide" tag="div" class="cards-wrapper">
        <DashboardPageMainLessonCard
            v-for="lesson in lessons"
            :key="lesson.id"
            :lesson="lesson"
            :class="'card-' + lesson.status"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  padding: 20px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  align-self: center;
}

.carousel-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* выравнивание по нижнему краю */
  padding-bottom: 40px; /* отступ от низа */
  position: relative;
  overflow: hidden;
}

.cards-wrapper {
  position: relative;
  width: 100%;
  height: 30vh; /* контролируем высоту видимой стопки */
}

/* Абсолютно позиционированные карточки */
.cards-wrapper > * {
  position: absolute;
  left: 0;
  width: 100%;
  transition: all 0.5s ease;
  box-sizing: border-box;
}

/* Центр — смещаем вверх от bottom */
.card-current {
  bottom: 10vh; /* центр стопки */
  z-index: 3;
 /* opacity: 1;*/
}

/* Предыдущая выше */
.card-previous {
  bottom: 20vh;
  z-index: 2;
  /*opacity: 0.5;*/
  scale: 0.85;
}

/* Следующая ниже */
.card-next {
  bottom: 0.5vh;
  z-index: 1;
  /*opacity: 0.5;*/
  scale: 0.85;
}

</style>