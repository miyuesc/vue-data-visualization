<template>
  <div class="chart-component">
    <div ref="lineLayerRef" class="map-canvas">线图层</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';

export default defineComponent({
  name: 'LineLayer',
  setup() {
    const lineLayerRef: Ref<HTMLDivElement | null> = ref(null);

    let map: any = null;

    const initMap = (): void => {
      map = new (window as any).AMap.Map(lineLayerRef.value, {
        zoom: 10.4,
        center: [116.335036, 39.900082],
        // showLabel: false,
        mapStyle: 'amap://styles/dark',
        viewMode: '3D',
        pitch: 80
      });

      const loca: any = new (window as any).Loca.Container({
        map
      });

      const geo = new (window as any).Loca.GeoJSONSource({
        url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json'
      });

      const ll = new (window as any).Loca.LineLayer({
        loca
      });
      const colors = [
        '#f7fcf5',
        '#e5f5e0',
        '#c7e9c0',
        '#a1d99b',
        '#74c476',
        '#41ab5d',
        '#238b45',
        '#006d2c',
        '#00441b'
      ].reverse();
      ll.setSource(geo, {
        color: function (index: number) {
          const i = index % colors.length;
          return colors[i];
        },
        lineWidth: (index: number) => {
          const i = index % colors.length;
          return i * 0.1 + 2;
        },
        altitude: function (index: number) {
          const i = index % colors.length;
          return 100 * i;
        },
        // dashArray: [10, 5, 10, 0],
        dashArray: [10, 0, 10, 0]
      });

      const dat = new (window as any).Loca.Dat();
      dat.addLayer(ll);
    };

    onMounted(() => initMap());

    return {
      lineLayerRef
    };
  }
});
</script>
