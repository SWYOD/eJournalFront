<script setup>

</script>

<template>
 <main class="profile-page-main">
  <div class="content-grid">
    <div class="cover">
      <div class="user-icon">

      </div>
      <img src="../../assets/images/Cover.png" alt="Обложка пользователя"/>
    </div>
  </div>
 </main>
</template>

<style scoped>
.profile-page-main{
  padding: calc(20px + 3%);

}
.content-grid{
  display: grid;
  grid-template-rows: 330px 1fr;
  height: 100%;
  width: 100%;
  background: #FFFFFF;
  border-radius: calc(40px);
  overflow: hidden;
}
.cover{
  width: 100%; /* Ширина контейнера */
  margin: 0 auto; /* Центрирование */
  overflow: hidden;
}
img{
  width: 100%; /* Изображение занимает всю ширину контейнера */
  height: auto; /* Сохраняем пропорции */
  display: block; /* Убираем лишние отступы */
}
.user-icon{
  position: absolute;
  background: #2C394F;
  border-radius: 100%;
  width: clamp(30px, 325px, 450px);
  height: clamp(30px, 325px, 450px);
  margin-top: 110px;
  margin-left: 100px;
  border: 3px solid #ffffff;
}
</style>