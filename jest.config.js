module.exports = {
  // testMatch: [ // glob 格式
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[jt]s?(x)"
  // ],
  verbose: true,
  testMatch: ["**/tests/**/*.[jt]s?(x)"],
  // 正则表达式格式，与 testMatch 互斥，不能同时声明
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
};