<template>
  <div class="shape-canvas triangle-shape-canvas">
    <div class="shape-canvas triangle-shape-canvas">
      <canvas style="width: 100%; height: 100%" ref="triangleShapeRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watchEffect } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';
import { Store, useStore } from 'vuex';
import type { StoreState } from '@/types/store';
import type { Canvas } from '@/types/canvas';

export default defineComponent({
  name: 'triangle',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const backgroundStyle: ComputedRef = computed(() => {
      return computedBackgroundStyle(props);
    });
    const store: Store<StoreState> = useStore();
    const canvasState: Canvas = store.state.canvas;

    // var ctxNode = document.getElementById('paint');
    const triangleShapeRef: Ref<HTMLCanvasElement | null> = ref(null);

    const renderTriangle = () => {
      const width = Math.floor(props.info.size.width * canvasState.scale);
      const height = Math.floor(props.info.size.height * canvasState.scale);
      // const middle = width / 2;
      if (triangleShapeRef.value) {
        triangleShapeRef.value.width = width;
        triangleShapeRef.value.height = height;
        const ctx: CanvasRenderingContext2D | null = triangleShapeRef.value.getContext('2d');
        if (ctx) {
          console.log(width, height);
          console.log(width / 2, height / 2);
          triangleShapeRef.value.height = height;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, height);
          ctx.lineTo(width, height);
          ctx.lineWidth = 0;
          ctx.fillStyle = backgroundStyle.value.backgroundColor;
          ctx.closePath();
          ctx.fill();
        }
      }
    };

    watchEffect(() => renderTriangle());

    onMounted(() => renderTriangle());

    return {
      triangleShapeRef,
      backgroundStyle
    };
  }
});
</script>
