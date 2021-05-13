import { hexToRgba } from '@/utils/commonUtils';
import { computed } from 'vue';

export default function (props: any) {
  const background: any = computed(() => props.info?.background).value;

  if (!background) return '';

  const borderStyle = {
    borderWidth: `${background.borderWidth || 0}px`,
    borderStyle: background.borderStyle || 'solid',
    borderColor: hexToRgba(background.borderColor || '#121212', background.borderOpacity ?? 0.6)
  };

  const boxShadow = `${background.shadowX}px ${background.shadowY}px ${background.shadowBlur}px ${background.shadowDiff}px ${background.shadowColor}`;

  const borderRadius = props.info.code === 'circle' ? '50%' : `${background?.borderRadius ?? 0}px`;

  return {
    backgroundColor: hexToRgba(background?.color || '#121212', background?.opacity ?? 0.6),
    borderRadius: borderRadius,
    ...borderStyle,
    boxShadow
  };
}
