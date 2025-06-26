<script setup>
defineProps({
  text: {
    type: String,
    default: () => 'text'
  },
  isSelected: { // Добавляем проп для отслеживания состояния выбора
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="cell" :class="{ 'selected': isSelected }">
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.cell {
  border: 1px solid #7EB8D3;
  border-radius: 0.7rem;
  padding: 0.5rem;
  background-color: white;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.cell:hover {
  background-color: #e6f2f8;
}

.cell:active {
  background-color: #b3d9ec;
  transition: background-color 0s;
}

/* Новые стили для выделенного состояния */
.cell.selected {
  background-color: #d8f3fc;
}

.cell.selected:hover {
  background-color: #a1c9e4;
}

.cell.selected:active {
  background-color: #8ab9e0;
}

.cell p {
  margin: 0;
  color: #7EB8D3;
}
.cell.selected:hover p {
  color: #FFFFFF;
}

.cell.selected:active p {
  color: #FFFFFF;
}
</style>