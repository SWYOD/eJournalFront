<script>
import DashboardPageMainLessonCard from "@/components/DashboardPage/DashboardPageMainLessonCard.vue";

export default {
  components: { DashboardPageMainLessonCard },
  data() {
    return {
      lessons: [
        {
          id: 1,
          group: 'ТЭО 31',
          title: 'Проектирование, разработка и оптимизация веб-приложений',
          subtitle: 'Деревья и их применение в программировании',
          type: 'Лекция',
          time: '08:00 – 09:45',
          status: 'previous',
        },
        {
          id: 2,
          group: 'ТЭО 31',
          title: 'Проектирование, разработка и оптимизация...',
          subtitle: 'Какая-то там тема',
          type: 'Лекция',
          time: '09:45 – 10:30',
          status: 'current',
        },
        {
          id: 3,
          group: 'ТЭО 31',
          title: 'Проектирование, разработка и оптимизация...',
          subtitle: 'Какая-то там тема',
          type: 'Лекция',
          time: '10:30 – 11:50',
          status: 'next',
        },
      ],
    };
  },
  methods: {
    rotateLessons() {
      const newLessons = JSON.parse(JSON.stringify(this.lessons));

      // Находим индексы карточек
      const currentIndex = newLessons.findIndex(l => l.status === 'current');
      const nextIndex = newLessons.findIndex(l => l.status === 'next');
      const prevIndex = newLessons.findIndex(l => l.status === 'previous');

      // Меняем статусы по кругу
      newLessons[prevIndex].status = 'next';
      newLessons[currentIndex].status = 'previous';
      newLessons[nextIndex].status = 'current';

      this.lessons = newLessons;
    },
  },
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
  height: 300px; /* контролируем высоту видимой стопки */
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
  bottom: 80px; /* центр стопки */
  transform: translateY(0%);
  z-index: 3;
  opacity: 1;
}

/* Предыдущая выше */
.card-previous {
  bottom: 140px;
  transform: translateY(0%);
  z-index: 2;
  opacity: 0.5;
  scale: 0.95;
}

/* Следующая ниже */
.card-next {
  bottom: 20px;
  transform: translateY(0%);
  z-index: 1;
  opacity: 0.5;
  scale: 0.95;
}

</style>