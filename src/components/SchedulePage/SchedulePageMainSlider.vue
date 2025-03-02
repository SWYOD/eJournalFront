<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const weekFriday = Date;
const weekString = ref('');
const emit = defineEmits(["changeWeek"]);
const userGroupId = localStorage.getItem("userGroupId");

async function changeWeek(date = new Date()) {
  const day = date.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 1);

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 2);

  const thursday = new Date(monday);
  thursday.setDate(monday.getDate() + 3);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "мая",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ];

  const lessonsMonday = [];
  const lessonsTuesday = [];
  const lessonsWednesday = [];
  const lessonsThursday = [];
  const lessonsFriday = [];

  const week = {
    monday: {
      date: monday.getDate(),
      month: months[monday.getMonth()],
      day: "Понедельник",
      lessons: []
    },
    tuesday: {
      date: tuesday.getDate(),
      month: months[tuesday.getMonth()],
      day: "Вторник",
      lessons: []
    },
    wednesday: {
      date: wednesday.getDate(),
      month: months[wednesday.getMonth()],
      day: "Среда",
      lessons: []
    },
    thursday: {
      date: thursday.getDate(),
      month: months[thursday.getMonth()],
      day: "Четверг",
      lessons: []
    },
    friday: {
      date: friday.getDate(),
      month: months[friday.getMonth()],
      day: "Пятница",
      lessons: []
    }
  };

  try {
    const response = await axios.get(
        "https://swyod-ejournal--af55.twc1.net/groups/" + userGroupId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
    );
    for (const lesson of response.data.timetables) {
      const date = new Date(lesson.subjDate);
      const data = {};
      try {
        const classroom = (await axios.get(
            "https://swyod-ejournal--af55.twc1.net/classrooms/" + lesson.classroomId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
        )).data.number;
        const teacher = (await axios.get(
            "https://swyod-ejournal--af55.twc1.net/teachers/" + lesson.teacherId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
        )).data.name;
        const subject = (await axios.get(
            "https://swyod-ejournal--af55.twc1.net/subjects/" + lesson.subjectId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
        )).data;
        data.classroom = classroom;
        data.teacher = teacher;
        data.subjectName = subject.name;
        data.subjectType = subject.type;
        data.timeStart = new Date(lesson.subjDate).getHours().toString().padStart(2, '0') + ":" + new Date(lesson.subjDate).getMinutes().toString().padStart(2, '0');
        data.timeEnd = (new Date(lesson.subjDate).getHours() + 1).toString().padStart(2, '0') + ":" + (new Date(lesson.subjDate).getMinutes() + 30).toString().padStart(2, '0');

      } catch (error) {
        console.log(error);
      }
      if (date.getDate() === monday.getDate()) {
        lessonsMonday.push(data);
      } else if (date.getDate() === tuesday.getDate()) {
        lessonsTuesday.push(data);
      } else if (date.getDate() === wednesday.getDate()) {
        lessonsWednesday.push(data);
      } else if (date.getDate() === thursday.getDate()) {
        lessonsThursday.push(data);
      } else if (date.getDate() === friday.getDate()) {
        lessonsFriday.push(data);
      }
    }

    week.monday.lessons = lessonsMonday;
    week.tuesday.lessons = lessonsTuesday;
    week.wednesday.lessons = lessonsWednesday;
    week.thursday.lessons = lessonsThursday;
    week.friday.lessons = lessonsFriday;

  } catch (error) {
    console.log(error);
  }

  weekString.value = `${monday.getDate()}.${monday.getMonth() + 1}.${monday.getFullYear()} - ${friday.getDate()}.${friday.getMonth() + 1}.${friday.getFullYear()}`
  weekFriday.value = friday;

  emit("changeWeek", week);
}

onMounted(async () => {
  const date = new Date();
  await changeWeek(date);
})

const getPrevWeek = async () => {
  const year = weekFriday.value.getFullYear();
  const month = weekFriday.value.getMonth();
  const day = weekFriday.value.getDate() - 6;
  const date = new Date(year, month, day);
  await changeWeek(date);
}
const getNextWeek = async () => {
  const year = weekFriday.value.getFullYear();
  const month = weekFriday.value.getMonth();
  const day = weekFriday.value.getDate() + 3;
  const date = new Date(year, month, day);
  await changeWeek(date);
}

</script>

<template>
  <div class="schedule-slider">
    <div class="schedule-week-prev" @click="getPrevWeek"></div>
    <p class="schedule-week-display">{{ weekString }}</p>
    <div class="schedule-week-next" @click="getNextWeek"></div>
  </div>
</template>

<style scoped>
  .schedule-slider {
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    place-items: center;
    border: 1px solid #98B8CB;
    border-radius: 10px;
    width: 250px;
    height: 30px;
  }

  .schedule-week-next, .schedule-week-prev {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    place-items: center;
  }
  .schedule-week-next {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: url("../../assets/icons/NextWeek.svg") no-repeat center;
  }
  .schedule-week-prev {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: url("../../assets/icons/PrevWeek.svg") no-repeat center;
  }
  .schedule-week-prev:hover {
    background: url("../../assets/icons/PrevWeek.svg") no-repeat center rgba(0, 0, 0, 0.1);
  }
  .schedule-week-next:hover {
    background: url("../../assets/icons/NextWeek.svg") no-repeat center rgba(0, 0, 0, 0.1);
  }
  .schedule-week-prev:active {
    background: url("../../assets/icons/PrevWeek.svg") no-repeat center rgba(0, 0, 0, 0.2);
  }
  .schedule-week-next:active {
    background: url("../../assets/icons/NextWeek.svg") no-repeat center rgba(0, 0, 0, 0.2);
  }


  .schedule-week-display {
    margin: 0;
    color: #98B8CB;
  }
  .schedule-week-next {
    border-left: 1px solid #98B8CB;
  }
  .schedule-week-prev {
    border-right: 1px solid #98B8CB;
  }
</style>