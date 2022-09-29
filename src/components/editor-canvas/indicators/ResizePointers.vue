<template>
  <div class="drag-indicator-area" :style="indicatorAreaStyle">
    <span
      v-for="point in points"
      :key="point"
      :class="`indicator-point indicator-point-${point}`"
      :style="pointsStyle(point)"
      @mousedown.stop="resizeStart($event, point)"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import resizeEventHook from '@/hooks/resizeEventHook';

export default defineComponent({
  name: 'ResizePointers',
  setup() {
    /*
     * 边框上的点标记，可触发 resize
     * [ tl --- tc --- tr ]
     * [ |              | ]
     * [ ml            mr ]
     * [ |              | ]
     * [ bl --- bc --- br ]
     */
    const points: string[] = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];

    const store = useStore();
    const acFlag = computed(() => store.state.acFlag);
    const canvas = computed(() => store.state.canvas);
    const acComponent = computed(() => store.state.acComponent);

    // border 样式
    const indicatorAreaStyle = computed(() => {
      const { indicatorVisible } = acFlag.value;
      if (!acComponent.value || !indicatorVisible) return { display: 'none' };
      const { size, position, zIndex = 0 } = acComponent.value;
      const width = size?.width || 0;
      const height = size?.height || 0;
      const left = position?.left || 0;
      const top = position?.top || 0;
      const bgColor = '#4a71fe';
      const borderWidth = Math.floor(2 / store.state.canvas.scale);
      return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        borderColor: bgColor,
        borderWidth: `${borderWidth}px`,
        zIndex
      };
    });
    // points 样式
    const pointsStyle: ComputedRef = computed(() => {
      return (point: string) => {
        const display = acFlag.value.indicatorVisible ? 'block' : 'none';
        if (point === 'tc' || point === 'bc') {
          return `transform: scale(${1 / canvas.value.scale}) translateX(-50%); display: ${display}`;
        }
        if (point === 'ml' || point === 'mr') {
          return `transform: scale(${1 / canvas.value.scale}) translateY(-50%); display: ${display}`;
        }
        return `transform: scale(${1 / canvas.value.scale}); display: ${display}`;
      };
    });

    const { resizeStart } = resizeEventHook();

    return {
      points,
      indicatorAreaStyle,
      pointsStyle,
      resizeStart
    };
  }
});
</script>

<style scoped lang="scss">
.drag-indicator-area {
  position: absolute;
  background: none;
  outline: none;
  box-sizing: border-box;
  border-style: solid;
  z-index: 4;
  user-select: none;
  pointer-events: none;
}
.indicator-point {
  position: absolute;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #4a71fe;
  border-radius: 4px;
  background: #ffffff;
  z-index: 3;
  user-select: none;
  pointer-events: auto;
}
.indicator-point-tl,
.indicator-point-tr,
.indicator-point-bl,
.indicator-point-br {
  width: 6px;
  height: 6px;
}
.indicator-point-tc,
.indicator-point-bc {
  width: 20%;
  min-width: 6px;
  max-width: 18px;
  height: 6px;
}
.indicator-point-ml,
.indicator-point-mr {
  width: 6px;
  height: 20%;
  min-height: 6px;
  max-height: 18px;
}
.indicator-point-tl {
  top: -4px;
  left: -4px;
  &:hover {
    cursor: se-resize;
  }
}
.indicator-point-tc {
  top: -4px;
  left: 50%;
  &:hover {
    cursor: n-resize;
  }
}
.indicator-point-tr {
  top: -4px;
  right: -4px;
  &:hover {
    cursor: sw-resize;
  }
}
.indicator-point-ml {
  top: 50%;
  left: -4px;
  &:hover {
    cursor: w-resize;
  }
}
.indicator-point-mr {
  top: 50%;
  right: -4px;
  &:hover {
    cursor: w-resize;
  }
}
.indicator-point-bl {
  bottom: -4px;
  left: -4px;
  &:hover {
    cursor: sw-resize;
  }
}
.indicator-point-bc {
  bottom: -4px;
  left: 50%;
  &:hover {
    cursor: n-resize;
  }
}
.indicator-point-br {
  bottom: -4px;
  right: -4px;
  &:hover {
    cursor: se-resize;
  }
}
</style>
