<script setup>
defineProps({
  text: {
    type: String,
    default: () => 'text'
  }
})
</script>

<template>
  <div class="cell">
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>

.cell {
  border: 1px solid #7EB8D3;
  border-radius: 0.7rem;
  padding: 0.5rem;
}
.cell p{
  margin: 0;
  color: #7EB8D3;
}
</style>