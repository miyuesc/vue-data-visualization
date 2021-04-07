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
        config: ["title", "background", "xAxis", "yAxis", "legend", "lineConfig"],
        dataConfig: []
      }, // 折线图
      barCharts: {
        name: "条形图",
        code: "barChart",
        componentName: "条形图",
        config: ["title", "background", "xAxis", "yAxis", "legend", "barConfig"],
        dataConfig: []
      }, // 柱状/条形图
      pieCharts: {
        name: "饼图",
        code: "pieChart",
        componentName: "饼图",
        config: ["title", "background", "legend", "pieConfig"]
      }, // 扇形/饼图
      radarCharts: {
        name: "雷达图",
        code: "radarChart",
        componentName: "雷达图",
        config: ["title", "background", "legend", "radarConfig"]
      }, // 雷达图
      treeCharts: {
        name: "树形图",
        code: "treeChart",
        componentName: "树形图",
        config: ["title", "background", "legend", "treeConfig"]
      }, // 树形图
      kCharts: {
        name: "K线图",
        code: "kChart",
        componentName: "K线图",
        config: ["title", "background", "legend", "kConfig"]
      }, // K 线图
      gaugeCharts: {
        name: "仪表盘",
        code: "gaugeChart",
        componentName: "仪表盘",
        config: ["title", "background", "legend", "gaugeConfig"]
      }, // 仪表盘
      graphCharts: {
        name: "关系图",
        code: "graphChart",
        componentName: "关系图",
        config: ["title", "background", "legend", "funnelConfig"]
      }, // 关系图
      funnelCharts: {
        name: "漏斗图",
        code: "funnelChart",
        componentName: "漏斗图",
        config: ["title", "background", "legend", "funnelConfig"]
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

// 默认配置部分
// 大小
export const size = {
  width: 400,
  height: 260
}
export const title = {
  titleVisible: false,
  titleContent: '',
  titleColor: '#eeeeee',
  titleBold: false,
  titleItalic: false,
  titleSize: 20,
  unitVisible: false,
  unitContent: '',
  unitColor: '#eeeeee',
  unitBold: false,
  unitItalic: false,
  unitSize: 14
}
export const background = {
  color: '#000000',
  borderRadius: 0,
  border: {
    width: 0,
    type: 'solid',
    color: '#000000'
  },
  opacity: 0.8,
  shadow: {
    color: '#000000',
    x: 0,
    y: 0,
    blur: 0
  }
}
// 坐标标签
export const labelConfig = {
  show: false, // 显示数据的文本标签
  position: "top", // 标签位置 top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
  distance: 5, // 标签距离
  rotate: 0, // 旋转
  fontSize: 12
}
// 折线配置
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
// 柱图配置
export const barConfig = {
  barWidth: "auto", // number or xx%(string)
  label: labelConfig,
  barGap: "30%",
  large: false, // 大数据优化
}

export default presetComponents;
