<script>
import DashboardPageMainLessonCard from "@/components/TeacherAgent/DashboardPage/DashboardPageMainLessonCard.vue";
import { DefaultApiInstance } from "@/api/index.js";

export default {
  components: { DashboardPageMainLessonCard },
  data() {
    return {
      lessons: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      teacherId: null,
      refreshInterval: null,
      isRefreshing: false
    };
  },
  methods: {
    async fetchLessons(page = 1, limit = 3) {
      try {
        const response = await DefaultApiInstance.get(
            `/timetables?page=${page}&limit=${limit}&teacherId=${this.teacherId}`
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
    },

    transformApiData(apiData) {
      if (!apiData?.data) return this.generateEmptyTriplet();

      // Сохраняем метаданные пагинации
      if (apiData.meta) {
        this.totalPages = apiData.meta.totalPages || 1;
      }

      // Преобразуем данные с сервера
      const serverLessons = apiData.data.map(lesson => ({
        id: lesson.id,
        group: lesson.group?.name || 'Не указана',
        title: lesson.subject?.name || 'Без названия',
        subtitle: lesson.description || 'Без описания',
        type: lesson.subject?.type || 'Занятие',
        time: `${this.formatTime(lesson.subjDate)} – ${this.formatTime(lesson.endDate)}`,
        status: this.validateStatus(lesson.status)
      }));

      // Находим последнее предыдущее занятие
      const previous = serverLessons
          .filter(l => l.status === 'previous')
          .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0];

      // Находим текущее занятие
      const current = serverLessons.find(l => l.status === 'current');

      // Находим ближайшее следующее занятие
      const next = serverLessons
          .filter(l => l.status === 'next')
          .sort((a, b) => new Date(a.subjDate) - new Date(b.subjDate))[0];

      // Формируем триплет занятий
      return [
        previous || this.generateEmptyLesson('previous'),
        current || this.generateBreakCard(),
        next || this.generateEmptyLesson('next')
      ];
    },

    generateBreakCard() {
      return {
        id: 0, // Специальный ID для карточки перерыва
        group: '',
        title: 'Перерыв',
        subtitle: 'До следующей пары',
        type: '',
        time: '',
        status: 'current'
      };
    },

    generateEmptyLesson(status) {
      return {
        id: -Math.floor(Math.random() * 1000),
        group: 'Нет данных',
        title: 'Нет занятий',
        subtitle: '',
        type: '',
        time: '',
        status: status
      };
    },

    generateEmptyTriplet() {
      return [
        this.generateEmptyLesson('previous'),
        this.generateEmptyLesson('current'),
        this.generateEmptyLesson('next')
      ];
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
    },

    async refreshLessons() {
      if (this.isRefreshing || this.isLoading) return;

      this.isRefreshing = true;
      try {
        const apiData = await this.fetchLessons(this.currentPage);
        const transformed = this.transformApiData(apiData);

        // Проверяем статусы всех уроков
        const allPrevious = transformed.length > 0 &&
            transformed.every(lesson => lesson.status === 'previous');

        // Если все уроки стали предыдущими
        if (allPrevious) {
          if (this.currentPage < this.totalPages) {
            // Переход на следующую страницу
            this.currentPage++;
          } else {
            // Возврат к первой странице
            this.currentPage = 1;
          }

          // Загружаем новую страницу
          const nextPageData = await this.fetchLessons(this.currentPage);
          this.lessons = this.transformApiData(nextPageData);
        } else {
          // Просто обновляем текущие данные
          this.lessons = transformed;
        }
      } catch (error) {
        console.error('Refresh error:', error);
        this.lessons = this.generateEmptyTriplet();
      } finally {
        this.isRefreshing = false;
      }
    }
  },
  async created() {
    this.isLoading = true;
    this.teacherId = localStorage.getItem('userId');

    try {
      // Первоначальная загрузка данных
      const apiData = await this.fetchLessons(this.currentPage);
      this.lessons = this.transformApiData(apiData);
    } catch (error) {
      this.error = error.message;
      this.lessons = this.generateEmptyTriplet();
    } finally {
      this.isLoading = false;
    }
  },
  mounted() {
    // Устанавливаем периодическое обновление каждые 30 секунд
    this.refreshInterval = setInterval(() => {
      this.refreshLessons();
    }, 30000);
  },
  beforeUnmount() {
    // Очищаем интервал при уничтожении компонента
    clearInterval(this.refreshInterval);
  }
};
</script>

<template>
  <div class="wrapper">
    <h2> Текущая пара </h2>
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
  padding: 10px;
  box-sizing: border-box;
}

.carousel-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.cards-wrapper {
  position: relative;
  width: 100%;
  height: 30vh;
}

.cards-wrapper > * {
  position: absolute;
  left: 0;
  width: 100%;
  transition: all 0.5s ease;
  box-sizing: border-box;
}

.card-current {
  bottom: 10vh;
  z-index: 3;
}

.card-previous {
  bottom: 20vh;
  z-index: 2;
  scale: 0.85;
}

.card-next {
  bottom: 0.5vh;
  z-index: 1;
  scale: 0.85;
}

/* Анимации для плавных переходов */
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>