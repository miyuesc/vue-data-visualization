import { computed } from 'vue';
import {hexToRgb, hexToRgba} from '@/utils/commonUtils';

export default function (config: any) {
  const backgroundStyle = computed(() => {
    if (!config) return "";
    let bgColor, borderStyle, boxShadow;
    if (config.color) {
      if (config.opacity) {
        bgColor = hexToRgb(config.color);
      } else {
        bgColor = hexToRgba(config.color, config.opacity)
      }
    }
    if (config.border) {
      borderStyle = {
        borderWidth: `${config.border.width || 0}px`,
        borderType: config.border.type || 'solid',
        borderColor: config.border.color || 'rgba(0, 0, 0, 0)'
      }
    }
    if (config.shadow) {
      boxShadow = `${config.shadow.x} ${config.shadow.y} ${config.shadow.blur} ${config.shadow.color}`
    }
    return {
      backgroundColor: bgColor,
      borderRadius: `${config.borderRadius || 0}px`,
      ...borderStyle,
      boxShadow
    }
  })

  return {
    backgroundStyle
  }
}
