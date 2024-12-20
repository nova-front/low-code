# 表单设计器(form-designer)

## 背景

- 简化中后台表单开发，快速实现表单开发
- 活动推广页面快速投入使用，运营人员可快速配置表单

## 需求

### 数据源（JSON Schema）

一份标准数据源，多端使用

```json
// example
"components": [
  {
    "type": "textfield",
    "label": "Text Field",
    "helperText": "",
    "required": false,
    "disabled": false,
    "defaultValue": "",
    "placeholder": "Please enter a value",
    "options": ["item a"],
    ...
  }
]
```

```ts
export type FieldType =
  | "textfield"
  | "textarea"
  | "checkbox"
  | "radio"
  | "switch"
  | "select"
  | "autocomplete"
  | "button"
  | "unknown";
```

| 属性         | 类型                                         | 默认值 | 描述         | 适用组件                                      |
| ------------ | -------------------------------------------- | ------ | ------------ | --------------------------------------------- |
| type         | FieldType                                    | -      | 组件类型     | all                                           |
| label        | React.ReactNode                              | -      | eg: 姓名     | all                                           |
| helperText   | React.ReactNode                              | -      | 辅助性提示语 | all                                           |
| required     | boolean                                      | false  | 是否必填     | all                                           |
| disabled     | boolean                                      | false  | 是否禁用     | all                                           |
| defaultValue | any                                          | -      | 默认值       | all                                           |
| placeholder  | string                                       | -      | 占位符       | textfield、textarea                           |
| options      | string[] \| {label: string, value: string}[] | -      | 选项         | checkbox、radio、switch、select、autocomplete |

### 基础组件

可定制化选择UI库

- textfield
- textarea
- checkbox
- radio
- switch
- select
- autocomplete

### 表单校验

### 表单适配器(adapter)

- 目的：具体页面使用 适配器 + 数据源，即可设计页面
- 页面排版布局交给使用者实现，但也支持默认布局？

## 技术栈

- [next.js](https://nextjs.org/)
- [react-dnd](https://react-dnd.github.io/react-dnd/docs/overview)
- [immutability-helper](https://www.npmjs.com/package/immutability-helper)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form) + [yup](https://www.npmjs.com/package/yup) + [@hookform/resolvers/yup](https://www.npmjs.com/package/@hookform/resolvers#yup)
- [react-toastify](https://www.npmjs.com/package/react-toastify)

## 参考

- [formio builder](https://formio.github.io/formio.js/app/builder.html)
