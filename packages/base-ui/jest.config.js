/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // 使用 ts-jest 处理 TypeScript
  testEnvironment: "jsdom", // 浏览器环境（服务器环境用 'node'）
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 路径别名（与 tsconfig.json 一致）
  },
  testMatch: ["**/*.test.ts?(x)"],
  collectCoverage: true, // 收集测试覆盖率
  coverageDirectory: "coverage", // 覆盖率报告目录
};
