const presetComponents: any = {
  // 图表
  charts: {
    name: "图表",
    icon: "dv-xuritu",
    children: {
      lineCharts: {
        name: "折线图",
        code: "lineChart"
      }, // 折线图
      barCharts: {
        name: "条形图",
        code: "barChart"
      }, // 柱状/条形图
      pieCharts: {
        name: "饼图",
        code: "pieChart"
      }, // 扇形/饼图
      radarCharts: {
        name: "雷达图",
        code: "radarChart"
      }, // 雷达图
      treeCharts: {
        name: "树形图",
        code: "treeChart"
      }, // 树形图
      kCharts: {
        name: "K线图",
        code: "kCharts"
      }, // K 线图
      gaugeCharts: {
        name: "仪表盘",
        code: "gaugeChart"
      }, // 仪表盘
      funnelCharts: {
        name: "漏斗图",
        code: "funnelChart"
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

export default presetComponents;
