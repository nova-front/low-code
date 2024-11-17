# 表单设计器(form-designer)

## 设计原则

- 使用非受控组件模式
- 字段之间的关系如何关联

## 表单生成器(builder)

- 目的：生成一份json结构的数据，用于做 pc/mobile 的组件的数据源
- 生成数据保存到管理系统, 反之，根据数据复现表单生成器
- 希望换个UI库，整个系统可以不变，只是把UI数据源换即可，或者数据源可配置

## 表单适配器(adapter)

- 目的：具体页面使用 适配器 + 数据源，即可设计页面
- 页面排版布局交给使用者实现，但也支持默认布局 ？

## 技术栈

- [next.js](https://nextjs.org/)
- [react-dnd](https://react-dnd.github.io/react-dnd/docs/overview)
- [immutability-helper](https://www.npmjs.com/package/immutability-helper)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form) + [yup](https://www.npmjs.com/package/yup) + [@hookform/resolvers/yup](https://www.npmjs.com/package/@hookform/resolvers#yup)
