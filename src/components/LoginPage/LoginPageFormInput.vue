<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input class="LoginPageFormInput"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)">
</template>

<style scoped>
.LoginPageFormInput {
  border: 1px solid #98B8CB;
  padding: 10px;
  border-radius: 12px;
  color: #1E465D;
  height: 15px;
  font-weight: 500;
  font-family: Montserrat;
}
</style>