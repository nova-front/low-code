# 富文本

## 功能

- 一个文本输入框，支持英语拼写检查
- 支持自定义正确单词传入【待完善，已预留支持】
- 支持5w+字符实时编辑（60FPS）
- 拼写检查延时 < 500ms

## 文档

### DOM + ContentEditable 实现 TextArea 基础功能(非受控)

```ts
import { ContentEditable } from "@nova-fe/editor";

<ContentEditable placeholder="请输入" />
```

### TextArea 基础(受控)

```ts
import { ContentEditable } from "@nova-fe/editor";

<ContentEditable
  placeholder="请输入"
  value={value}
  onChange={setValue}
/>
```

### 24px蓝色字体, 行高 1.6, 内边距 12px, 开启 spellcheck

```ts
<ContentEditable
  style={{
    fontSize: "24px",
    lineHeight: 1.6,
    color: "blue",
    padding: "12px",
  }}
  spellcheck
  placeholder="请输入"
/>
```

### use-undo 实现撤销/重做功能，同时保持与原生编辑体验的一致性

```ts
import { UndoableEditor } from "@nova-fe/editor";

<UndoableEditor spellcheck />
```

## 在 Vite 中使用

需要调整配置

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@nova-fe/editor"],
    include: ["deepmerge", "typo-js"],
  },
  build: {
    rollupOptions: {
      external: ["@nova-fe/editor"],
    },
  },
  // ...
});
```
