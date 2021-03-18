module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'warn', {
        useTabs: false, // 不使用tab
        singleQuote: false, // 不使用单引号
        printWidth: 120, // 换行字符串阈值
        semi: true, // 句末加分号
        trailingComma: "none", // 最后一个对象元素加逗号
        bracketSpacing: true, // 对象，数组加空格
        jsxBracketSameLine: true, // jsx > 是否另起一行
        arrowParens: "avoid", // (x) => {} 是否要有小括号
        requirePragma: false, // 是否要注释来决定是否格式化代码
        proseWrap: "preserve" // 是否要换行
      }
    ]
  },
};
