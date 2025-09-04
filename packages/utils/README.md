# @nova-fe/utils

基于 rollup 4 + typescript 封装常用的工具函数，利用 Jest 实现自动化测试；vscode 自定义工作区 保持代码风格一致；可在 react、vue 项目中使用。

## 例子

```ts
import { sleep } from '@nova-fe/utils';

const clickFn = async () => {
  await sleep(3000);
  console.log('3秒后执行');
};
```

## [手把手搭建工具库](https://yuanyi.love/docs/lab/library)
