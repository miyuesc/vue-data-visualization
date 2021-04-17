import { hexToRgba } from '@/utils/commonUtils';

export default function (background: any) {
  if (!background) return '';

  const borderStyle = {
    borderWidth: `${background.borderWidth || 0}px`,
    borderStyle: background.borderStyle || 'solid',
    borderColor: hexToRgba(background.borderColor || '#121212', background.borderOpacity ?? 0.6)
  };

  const boxShadow = `${background.shadowX}px ${background.shadowY}px ${background.shadowBlur}px ${background.shadowDiff}px ${background.shadowColor}`;

  return {
    backgroundColor: hexToRgba(background?.color || '#121212', background?.opacity ?? 0.6),
    borderRadius: `${background?.borderRadius ?? 0}px`,
    ...borderStyle,
    boxShadow
  };
}
