// echarts 轴线、分割线 等 连线 设置
export const lineStyle = {
  color: '#aaaaaa',
  width: 1,
  type: 'solid',
  opacity: 1
}

// echarts 轴线、分割线 等 文字相关 设置
export const fontStyle = {
  color: null,
  fontSize: 12,
  fontWeight: 'normal' // bold, bolder, lighter
}

export const titleConfig = {
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
  color: '',
  opacity: 0.8,
  borderRadius: 8,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: '#6f6ff5',
  borderOpacity: 1,
  shadowColor: '#E6A23C',
  shadowX: 0,
  shadowY: 0,
  shadowBlur: 0,
  shadowDiff: 0
}

export const grid = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
}

export const legend = {
  show: true,
  orient: "vertical",
  align: "auto",
  itemWidth: 25,
  itemHeight: 14,
  selectedMode: true,
  icon: '',
  textStyle: {
    ...fontStyle
  }
}

export const xAxis = {
  show: true,
  offset: 0,
  name: '',
  nameLocation: 'end', // start, middle
  nameRotate: 0,
  // 坐标轴显示的文字/数字样式
  nameTextStyle: {
    color: '',
    fontSize: 12,
    fontWeight: 'normal' // bold, bolder, lighter
  },
  // 轴线设置
  axisLine: {
    show: true,
    onZero: true,
    lineStyle: { ...lineStyle}
  },
  // 刻度线段设置
  axisTick: {
    show: true,
    alignWidthLabel: false,
    inside: false,
    length: 5,
    lineStyle: { ...lineStyle}
  },
  // 刻度名称设置
  axisLabel: {
    show: true, // 显示数据的文本标签
    margin: 5, // 标签距离
    rotate: 0, // 旋转
    formatter: '{value}',
    color: '',
    width: null,
    height: null,
    padding: 0,
    borderRadius: 0
  },
  // 刻度分割线设置
  splitLine: {
    show: false,
    lineStyle: { ...lineStyle}
  }
}

export const yAxis = {
  show: true,
  offset: 0,
  name: '',
  nameLocation: 'end', // start, middle
  nameRotate: 0,
  // 坐标轴显示的文字/数字样式
  nameTextStyle: {
    color: '',
    fontSize: 12,
    fontWeight: 'normal' // bold, bolder, lighter
  },
  // 轴线设置
  axisLine: {
    show: true,
    onZero: true,
    lineStyle: { ...lineStyle}
  },
  // 刻度线段设置
  axisTick: {
    show: true,
    alignWidthLabel: false,
    inside: false,
    length: 5,
    lineStyle: { ...lineStyle}
  },
  // 刻度名称设置
  axisLabel: {
    show: true, // 显示数据的文本标签
    margin: 5, // 标签距离
    rotate: 0, // 旋转
    formatter: '{value}',
    color: '',
    width: null,
    height: null,
    padding: 0,
    borderRadius: 0
  },
  // 刻度分割线设置
  splitLine: {
    show: false,
    lineStyle: { ...lineStyle}
  }
}

export default {
  titleConfig,
  background,
  grid,
  legend,
  xAxis,
  yAxis
}
