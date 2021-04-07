import { useStore } from "vuex";
import { computed } from "vue";
import { throttle } from "@/utils/commonUtils";

export default function resizeEventHook() {
  const store = useStore();
  const canvas = computed(() => store.state.canvas).value;

  const throttleUpdate: any = throttle((newState: any) => {
    store.commit('updateComponentPAS', newState);
  }, 8);

  const resizeStart = (event: any, point: string) => {
    const activePoint = point;
    // 记录点所在的父元素的 状态， 与点的当前位置
    const currentPAS = {
      x: event.target.parentNode.offsetLeft,
      y: event.target.parentNode.offsetTop,
      width: event.target.parentNode.clientWidth,
      height: event.target.parentNode.clientHeight,
      clientX: event.clientX,
      clientY: event.clientY
    }

    const resizing = (event: MouseEvent) => {
      const { x, y, width, height, clientX, clientY } = currentPAS;
      let newWidth = width;
      let newHeight = height;
      let newLeft = x;
      let newTop = y;
      const offsetX = (event.clientX - clientX) / canvas.scale; // x 方向偏移量
      const offsetY = (event.clientY - clientY) / canvas.scale; // y 方向偏移量
      // 边界判断
      const isLegalX = offsetX + x > 0 && offsetX + x < canvas.size.width;
      const isLegalY = offsetY + y > 0 && offsetY + y < canvas.size.height;
      // 根据 鼠标移动距离 设置 新的高宽
      // 左上, 均会改变
      if (activePoint === 'tl') {
        newWidth = isLegalX ? width - offsetX : width + x;
        if (newWidth > 0) {
          newLeft = isLegalX ? x + offsetX : 0;
        } else {
          newLeft = width + x;
          newWidth = 0;
        }
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 中上, newLeft, newWidth 不变
      if (activePoint === 'tc') {
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 右上, newLeft 不变
      if (activePoint === 'tr') {
        const maxWidth = canvas.size.width - x;
        newWidth = width + offsetX > maxWidth ? maxWidth : width + offsetX;
        if (newWidth <= 0) newWidth = 0;
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 左中, newTop、newHeight 不变
      if (activePoint === 'ml') {
        const maxWidth = width + x;
        newWidth = width - offsetX > maxWidth ? maxWidth : width - offsetX;
        newLeft = width - offsetX > maxWidth ? 0 : newLeft + offsetX;
        if (newWidth <= 0) {
          newWidth = 0;
          newLeft = maxWidth;
        }
      }
      // 右中, newTop、newHeight、newLeft 不变
      if (activePoint === 'mr') {
        const maxWidth = canvas.size.width - x;
        newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
        if (newWidth <= 0) newWidth = 0;
      }
      // 下左, newTop 不变
      if (activePoint === 'bl') {
        const maxWidth = width + x;
        newWidth = width - offsetX > maxWidth ? maxWidth : width - offsetX;
        newLeft = width - offsetX > maxWidth ? 0 : newLeft + offsetX;
        if (newWidth <= 0) {
          newWidth = 0;
          newLeft = maxWidth;
        }
        const maxHeight = canvas.size.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }
      // 下中, newWidth, newTop 不变
      if (activePoint === 'bc') {
        const maxHeight = canvas.size.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }
      // 下右, newTop, newLeft 不变
      if (activePoint === 'br') {
        const maxWidth = canvas.size.width - x;
        newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
        if (newWidth <= 0) newWidth = 0;
        const maxHeight = canvas.size.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }

      const newPAS = {
        position: { left: Math.floor(newLeft), top: Math.floor(newTop) },
        size: { width: Math.floor(newWidth) || 0, height: Math.floor(newHeight) || 0 }
      };

      throttleUpdate(newPAS);
    }

    const resizeEnd = () => {
      document.documentElement.removeEventListener('mousemove', resizing);
      document.documentElement.removeEventListener('mouseup', resizeEnd);
    }
    document.documentElement.addEventListener('mousemove', resizing);
    document.documentElement.addEventListener('mouseup', resizeEnd);
  }
  return {
    resizeStart
  }
}
