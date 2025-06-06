<template>
  <div class="group-popup-overlay" @click.self="close">
    <div class="group-popup">
      <div class="popup-header">
        <h3>Выберите группу</h3>
        <button @click="close" class="close-btn">×</button>
      </div>
      <div class="popup-content">
        <ul>
          <li
              v-for="group in groups"
              :key="group.id"
              @click="selectGroup(group.id)"
              :class="{ 'selected': group.id === selectedGroup }"
          >
            {{ group.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: Array,
    selectedGroup: Number
  },
  emits: ['select-group', 'close'],
  methods: {
    selectGroup(groupId) {
      this.$emit('select-group', groupId);
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.group-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.group-popup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 300px;
  max-height: 80vh;
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.popup-content {
  padding: 8px 0;
}

.popup-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 60vh;
  overflow-y: auto;
}

.popup-content li {
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s;
}

.popup-content li:hover {
  background: #f5f9ff;
}

.popup-content li.selected {
  background: #e6f2ff;
  font-weight: bold;
}

.close-btn {
  font-size: 24px;
  line-height: 1;
  padding: 0 12px;
}
</style>