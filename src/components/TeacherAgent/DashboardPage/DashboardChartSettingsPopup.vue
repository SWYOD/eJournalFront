<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="settings-popup">
      <div class="popup-header">
        <h3>Настройки графика</h3>
        <button @click="closePopup">×</button>
      </div>
      <div class="popup-content">
        <div class="settings-column">
          <h4>Группы</h4>
          <div v-for="group in groups" :key="group.id" class="checkbox-item">
            <input
                type="checkbox"
                :id="'group_' + group.id"
                :value="group.id"
                v-model="selectedGroups"
            >
            <label :for="'group_' + group.id">{{ group.name }}</label>
          </div>
        </div>
        <div class="settings-column">
          <h4>Предметы</h4>
          <div v-for="subject in filteredSubjects" :key="subject.id" class="checkbox-item">
            <input
                type="checkbox"
                :id="'subject_' + subject.id"
                :value="subject.id"
                v-model="selectedSubjects"
            >
            <label :for="'subject_' + subject.id">{{ subject.name }}</label>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <button @click="applySettings">Применить</button>
        <button @click="closePopup">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: Array,
    subjects: Array,
    initialSelectedGroups: Array,
    initialSelectedSubjects: Array
  },
  data() {
    return {
      selectedGroups: [...this.initialSelectedGroups],
      selectedSubjects: [...this.initialSelectedSubjects]
    };
  },
  computed: {
    filteredSubjects() {
      return this.subjects;
    }
  },
  methods: {
    applySettings() {
      this.$emit('apply', {
        groups: this.selectedGroups,
        subjects: this.selectedSubjects
      });
      this.closePopup();
    },
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
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

.settings-popup {
  background: white;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.popup-content {
  display: flex;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.settings-column {
  flex: 1;
  padding: 0 12px;
}

.checkbox-item {
  margin: 8px 0;
  display: flex;
  align-items: center;
}

.popup-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>