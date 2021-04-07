import { computed } from "vue";
import {hexToRgba} from "@/utils/commonUtils";

export default function backgroundMixins(backgroundConfig: any) {
  const backgroundStyle = computed(() => {
    if (!backgroundConfig) return "";
    return {
      backgroundColor: hexToRgba(backgroundConfig?.color?? "#121212", backgroundConfig?.opacity ?? 0.6)
    }
  })

  return {

  }
}
