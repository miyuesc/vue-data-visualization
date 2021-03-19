/* eslint-disable */
const presetComponents: any = {
  // 图表
  charts: {
    name: "图表",
    icon: "dv-xuritu",
    children: {
      lineCharts: {
        name: "折线图",
        code: "lineChart",
        componentName: "折线图",
        config: ["size", "position", "zIndex", "title", "background", "xAxis", "yAxis", "legend", "lineConfig"],
        dataConfig: []
      }, // 折线图
      barCharts: {
        name: "条形图",
        code: "barChart",
        componentName: "条形图",
        config: ["size", "position", "zIndex", "title", "background", "xAxis", "yAxis", "legend", "barConfig"],
        dataConfig: []
      }, // 柱状/条形图
      pieCharts: {
        name: "饼图",
        code: "pieChart",
        componentName: "饼图",
        config: ["size", "position", "zIndex", "title", "background", "legend", "pieConfig"]
      }, // 扇形/饼图
      radarCharts: {
        name: "雷达图",
        code: "radarChart",
        componentName: "雷达图",
        config: ["size", "position", "zIndex", "title", "background", "legend", "radarConfig"]
      }, // 雷达图
      treeCharts: {
        name: "树形图",
        code: "treeChart",
        componentName: "树形图",
        config: ["size", "position", "zIndex", "title", "background", "legend", "treeConfig"]
      }, // 树形图
      kCharts: {
        name: "K线图",
        code: "kCharts",
        componentName: "K线图",
        config: ["size", "position", "zIndex", "title", "background", "legend", "kConfig"]
      }, // K 线图
      gaugeCharts: {
        name: "仪表盘",
        code: "gaugeChart",
        componentName: "仪表盘",
        config: ["size", "position", "zIndex", "title", "background", "legend", "gaugeConfig"]
      }, // 仪表盘
      funnelCharts: {
        name: "漏斗图",
        code: "funnelChart",
        componentName: "漏斗图",
        config: ["size", "position", "zIndex", "title", "background", "legend", "funnelConfig"]
      } // 漏斗图
    }
  },
  // 文本
  text: {
    name: "文本",
    icon: "dv-text",
    children: {
      title: {},
      area: {},
      content: {}
    }
  },
  // 多媒体
  media: {
    name: "多媒体",
    icon: "dv-media",
    children: {
      picture: {},
      video: {},
      voice: {}
    }
  },
  // 形状
  shape: {
    name: "形状",
    icon: "dv-shape",
    children: {
      rectangle: {},
      circle: {},
      triangle: {}
    }
  },
  // 数据展示
  data: {
    name: "数据展示",
    icon: "dv-data",
    children: {
      list: {},
      table: {}
    }
  },
  // 地图
  map: {
    name: "地图",
    icon: "dv-map",
    children: {
      worldMap: {}
    }
  }
};

export const labelConfig = {
  show: false, // 显示数据的文本标签
  position: "top", // 标签位置 top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
  distance: 5, // 标签距离
  rotate: 0, // 旋转
  fontSize: 12
}

export const lineConfig = {
  showSymbol: true, // 拐点
  symbol: "emptyCircle", // 'emptyCircle', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  symbolSize: 4,
  label: labelConfig,
  areaStyle: {
    color: "rgba(0,0,0,0)",
    opacity: 0, // 0 - 1, 为0时不绘制阴影
  },
  step: false, // 'start', 'middle', 'end', false
  smooth: false, // 平滑曲线
  animation: true, // 动画效果
}

export const barConfig = {
  barWidth: "auto", // number or xx%(string)
  label: labelConfig,
  barGap: "30%",
  large: false, // 大数据优化
}

export default presetComponents;
