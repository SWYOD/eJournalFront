<template>
  <div
      ref="container"
      class="grid-container"
      :style="gridStyle"
      :class="{ 'dragging': isDragging }"
  >
    <div
        v-for="(col, index) in internalColumns"
        :key="index"
        class="column"
        :ref="el => setColumnRef(el, index)"
        :style="getColumnStyle(index)"
    >
      <div class="column-content">
        <slot :name="`col-${index}`">
          <div v-if="defaultContent[index]" v-html="defaultContent[index]"></div>
          <div v-else>Колонка {{ index + 1 }}</div>
        </slot>
      </div>
    </div>

    <div
        v-for="(_, index) in resizersCount"
        :key="`resizer-${index}`"
        class="resizer"
        :style="getResizerStyle(index)"
        @mousedown="startDrag(index, $event)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, reactive } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [
      { autoSize: true, minWidth: 150 },
      { autoSize: true, minWidth: 150 },
      { autoSize: true, minWidth: 150 },
      { autoSize: true, minWidth: 150 }
    ]
  },
  defaultContent: {
    type: Array,
    default: () => []
  }
});

const minWidth = ref(50);
const resizersCount = computed(() => props.columns.length - 1);

// Внутреннее состояние колонок с возможностью сохранения размеров
const internalColumns = reactive(
    props.columns.map(col => ({
      ...col,
      manualWidth: null, // Сохраняем ручной размер
      baseSize: 1 // Базовый размер во fr
    }))
);

// Состояние размеров
const pixelWidths = ref([]);

// Ссылки на элементы
const columnRefs = ref([]);
const container = ref(null);

// Состояние перетаскивания
const isDragging = ref(false);
const activeResizer = ref(null);
const startX = ref(0);
const startWidths = ref([]);

// Для обновления позиций разделителей
const resizerPositions = ref(Array(props.columns.length - 1).fill(0));

// Вычисляемые свойства
const gridStyle = computed(() => {
  if (isDragging.value && pixelWidths.value.length === internalColumns.length) {
    return {
      'grid-template-columns': pixelWidths.value.map(w => `${w}px`).join(' ')
    };
  }

  const columnsTemplate = internalColumns.map((col, index) => {
    // Если установлен ручной размер - используем его
    if (col.manualWidth) return `${col.manualWidth}px`;

    // Если включен авторазмер
    if (col.autoSize) return 'auto';

    // Иначе используем базовый размер
    return `${col.baseSize}fr`;
  });

  return {
    'grid-template-columns': columnsTemplate.join(' ')
  };
});

// Установка ссылок на колонки
const setColumnRef = (el, index) => {
  if (el) columnRefs.value[index] = el;
};

// Позиция разделителя
const getResizerStyle = (index) => {
  return {
    left: `${resizerPositions.value[index]}px`,
    cursor: isDragging.value ? 'col-resize' : 'col-resize'
  };
};

// Стили для колонок
const getColumnStyle = (index) => {
  return {
    'min-width': `${internalColumns[index].minWidth}px`
  };
};

// Обновление позиций разделителей
const updateResizerPositions = () => {
  if (!columnRefs.value.length || !columnRefs.value[0]) return;

  const newPositions = [];
  let currentPosition = 0;

  for (let i = 0; i < internalColumns.length; i++) {
    if (columnRefs.value[i]) {
      currentPosition += columnRefs.value[i].offsetWidth;

      if (i < internalColumns.length - 1) {
        newPositions.push(currentPosition);
      }
    }
  }

  resizerPositions.value = newPositions;
};

// Начало перетаскивания
const startDrag = (resizerIndex, event) => {
  isDragging.value = true;
  activeResizer.value = resizerIndex;
  startX.value = event.clientX;

  // Помечаем колонки как измененные вручную
  internalColumns[resizerIndex].autoSize = false;
  internalColumns[resizerIndex + 1].autoSize = false;

  // Сохраняем текущие ширины колонок
  startWidths.value = Array.from(columnRefs.value).map(
      col => col.getBoundingClientRect().width
  );

  // Инициализируем пиксельные ширины
  pixelWidths.value = [...startWidths.value];

  document.body.style.userSelect = 'none';
  document.body.style.cursor = 'col-resize';
};

// Процесс перетаскивания
const handleDrag = (event) => {
  if (!isDragging.value) return;

  const delta = event.clientX - startX.value;
  const leftIndex = activeResizer.value;
  const rightIndex = activeResizer.value + 1;

  // Создаем копию текущих размеров
  const newWidths = [...pixelWidths.value];

  // Определяем минимальные ширины
  const leftMin = Math.max(minWidth.value, internalColumns[leftIndex].minWidth);
  const rightMin = Math.max(minWidth.value, internalColumns[rightIndex].minWidth);

  // Изменяем размеры с учетом минимальной ширины
  const newLeftWidth = Math.max(leftMin, startWidths.value[leftIndex] + delta);
  const newRightWidth = Math.max(rightMin, startWidths.value[rightIndex] - delta);

  // Проверяем, что изменения возможны
  if (newLeftWidth + newRightWidth <= startWidths.value[leftIndex] + startWidths.value[rightIndex]) {
    newWidths[leftIndex] = newLeftWidth;
    newWidths[rightIndex] = newRightWidth;
    pixelWidths.value = newWidths;

    // Обновляем позиции разделителей в реальном времени
    updateResizerPositions();
  }
};

// Завершение перетаскивания
const stopDrag = () => {
  if (!isDragging.value) return;

  // Сохраняем ручные размеры для измененных колонок
  const leftIndex = activeResizer.value;
  const rightIndex = activeResizer.value + 1;

  internalColumns[leftIndex].manualWidth = pixelWidths.value[leftIndex];
  internalColumns[rightIndex].manualWidth = pixelWidths.value[rightIndex];

  // Сбрасываем состояние
  isDragging.value = false;
  activeResizer.value = null;
  pixelWidths.value = [];

  document.body.style.userSelect = '';
  document.body.style.cursor = '';

  // Обновляем позиции разделителей после перетаскивания
  setTimeout(updateResizerPositions, 10);
};

// Инициализация
onMounted(() => {
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDrag);

  // Инициализация ResizeObserver
  const resizeObserver = new ResizeObserver(() => {
    if (!isDragging.value) {
      updateResizerPositions();
    }
  });

  // Наблюдаем за контейнером
  if (container.value) {
    resizeObserver.observe(container.value);
  }

  // Обновляем позиции после монтирования
  nextTick(updateResizerPositions);

  // Очистка при размонтировании
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', stopDrag);
    resizeObserver.disconnect();
  });
});

// Реагируем на изменение количества колонок
watch(() => props.columns, (newColumns) => {
  internalColumns.splice(0, internalColumns.length, ...newColumns.map(c => ({
    ...c,
    manualWidth: null,
    baseSize: 1
  })));

  nextTick(() => {
    updateResizerPositions();
  });
}, { deep: true });
</script>

<style scoped>
/* Стили остаются без изменений */
.grid-container {
  display: grid;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
  gap: 1px;
}

.column {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: white;
  min-width: 50px;
}

.column-content {
  height: 100%;
  padding: 16px;
  overflow: auto;
  box-sizing: border-box;
}

.resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  z-index: 30;
  cursor: col-resize;
  background-color: transparent;
  transform: translateX(-50%);
}

.resizer:hover::after,
.resizer:active::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background-color: #4d90fe;
  transition: all 0.2s;
}

.resizer:hover::after {
  width: 3px;
  background-color: #4d90fe;
}

.resizer:active::after {
  width: 4px;
  background-color: #1a73e8;
}

.grid-container.dragging .resizer::after {
  width: 4px;
  background-color: #1a73e8;
}

.grid-container.dragging {
  cursor: col-resize;
}

.grid-container.dragging * {
  pointer-events: none;
}

.grid-container.dragging .resizer {
  pointer-events: auto;
}
</style>