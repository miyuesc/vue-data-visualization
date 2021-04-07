import { hexToRgba } from '@/utils/commonUtils';

export default function (background: any) {
  if (!background) return '';

  let borderStyle, boxShadow;
  if (background.border) {
    borderStyle = {
      borderWidth: `${background.border.width || 0}px`,
      borderStyle: background.border.type || 'solid',
      borderColor: background.border.color || 'rgba(0, 0, 0, 0)'
    }
  }
  if (background.shadow) {
    boxShadow = `${background.shadow.x} ${background.shadow.y} ${background.shadow.blur} ${background.shadow.color}`
  }
  const backgroundStyle = {
      backgroundColor: hexToRgba(background?.color || "#121212", background?.opacity ?? 0.6),
      borderRadius: `${background?.borderRadius ?? 0}px`,
      ...borderStyle,
      boxShadow
  }

  return backgroundStyle;
}
