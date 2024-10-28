# 新星前线(nova-front)

“Nova” 有新星之意，象征着新的、创新的。这项目是一个充满创新和活力的前端蓝图，为前端领域带来新的可能性。

### Apps and Packages

| name                      | description                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `docs`                    | a [Next.js](https://nextjs.org/) app                                                 |
| `web`                     | another [Next.js](https://nextjs.org/) app                                           |
| `@repo/ui`                | a stub React component library shared by both `web` and `docs` applications          |
| `@repo/mui`               | React component library mui 二次封装                                                 |
| `@repo/eslint-config`     | `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) |
| `@repo/typescript-config` | `tsconfig.json`s used throughout the monorepo                                        |

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## 低代码平台

### 组件设计 - mui 二次封装

### 低代码API(lowcode-api)

nestjs

### 表单生成器(form-build)

- 目的：生成一份json结构的数据，用于做 pc/mobile 的组件的数据源
- 生成数据保存到管理系统, 反之，根据数据复现表单生成器
- 希望换个UI库，这个系统可以不变，只是把UI数据源换即可，或者数据源可配置

### 表单适配器(form-adapter)

- 目的：具体页面使用 适配器 + 数据源，即可设计页面
- 页面排版布局交给使用者实现，但也支持默认布局？

### 表单模版管理系统(lowcode-admin)

管理生成的json表单数据，有唯一名称
