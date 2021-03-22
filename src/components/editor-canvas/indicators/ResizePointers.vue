<template>
  <div class="drag-indicator-area" :style="indicatorAreaStyle">
    <span
      v-for="point in points"
      :key="point"
      :class="`indicator-point indicator-point-${point}`"
      :style="pointsStyle"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
// import { ChartComponent } from '@/types/components';
// import { Canvas } from '@/types/canvas';
// import { MouseDownCoordinator } from '@/types/mouseStatus';

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
    // const activeElementState: ChartComponent = store.state.activeElement;
    // const canvasState: Canvas = store.state.canvas;
    //
    // const isActive: ComputedRef<boolean> = computed(() => activeElementState.visible);
    // const scale: ComputedRef<number> = computed(() => canvasState.scale);

    const canvas: any = computed(() => store.state.canvas);
    const activityComponent: any = computed(() => store.state.activity.component);

    // border 样式
    const indicatorAreaStyle = computed(() => {
      if (!store.state.activity.component) return { display: 'none' };
      const { size, position, zIndex = 0, visible = false } = store.state.activity.component;
      const width = size?.width || 0;
      const height = size?.height || 0;
      const left = position?.left || 0;
      const top = position?.top || 0;
      const bgColor = visible ? '#4a71fe' : '#4a71fe00';
      const borderWidth = Math.floor(2 / canvas.value.scale);
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
    const pointsStyle: ComputedRef<string> = computed(() => {
      const display = activityComponent.value?.visible ? 'block' : 'none';
      return `transform: scale(${1 / canvas.value.scale}); display: ${display}`;
    });

    // 选中point并准备进行大小改变, 记录初始状态（需要阻止冒泡）
    // const handleToResize = (point: string, event: any) => {
    //   event.stopPropagation();
    //   const currentPAS: MouseDownCoordinator = {
    //     x: event.target.parentNode.offsetLeft, // 鼠标所在元素 距离父元素左侧 的距离
    //     y: event.target.parentNode.offsetTop, // 鼠标所在元素 距离父元素上侧 的距离
    //     width: event.target.parentNode.clientWidth, // 鼠标所在元素 的标记元素 的宽度
    //     height: event.target.parentNode.clientHeight, // 鼠标所在元素 的标记元素 的高度
    //     mouseX: event.clientX, // 鼠标处于屏幕的横向位置
    //     mouseY: event.clientY // 鼠标处于屏幕的纵向位置
    //   };
    //   store.commit('mouseStatus/updateMAT', 'resize');
    //   store.commit('activeElement/updateResizable', true);
    //   store.commit('mouseStatus/updateMDC', currentPAS);
    //   store.commit('mouseStatus/updateActivePoint', point);
    // };

    return {
      points,
      indicatorAreaStyle,
      pointsStyle,
      activityComponent
      // handleToResize
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
  width: 6px;
  height: 6px;
  box-sizing: border-box;
  border: 1px solid #4a71fe;
  border-radius: 50%;
  background: #ffffff;
  z-index: 3;
  user-select: none;
  pointer-events: auto;
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
