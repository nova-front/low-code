# 📦 NPM 发布指南

本文档介绍如何将 `@nova-fe/color` 颜色系统库发布到 npm。

## 🚀 快速发布

### 1. 发布前检查

```bash
# 自动检查（推荐）
npm run check:pre-publish

# 或手动检查
npm install          # 确保依赖已安装
npm run build        # 运行构建
npm run check:build  # 检查构建产物
```

### 2. 登录 npm

```bash
# 检查登录状态
npm whoami

# 如果未登录，执行登录
npm login
```

### 3. 更新版本

```bash
# 补丁版本（1.0.0 → 1.0.1）
npm version patch

# 次要版本（1.0.0 → 1.1.0）
npm version minor

# 主要版本（1.0.0 → 2.0.0）
npm version major
```

### 4. 发布到 npm

```bash
# 一键发布（推荐）
npm run release:patch   # 补丁版本
npm run release:minor   # 次要版本
npm run release:major   # 主要版本

# 或手动发布
npm publish

# 如果是第一次发布scoped包，需要指定public
npm publish --access public
```

## 📋 发布检查清单

发布前请确认：

- [ ] 运行发布前检查 (`npm run check:pre-publish`)
- [ ] 代码已构建成功 (`npm run build`)
- [ ] 构建产物存在 (`npm run check:build`)
- [ ] package.json 版本号已更新
- [ ] 已登录正确的 npm 账户 (`npm whoami`)
- [ ] 包名 `@nova-fe/color` 可用

## 🔍 验证发布

### 1. 检查 npm 官网

访问 https://www.npmjs.com/package/@nova-fe/color

### 2. 本地测试安装

```bash
# 在新目录测试
mkdir test-color && cd test-color
npm init -y
npm install @nova-fe/color

# 检查文件
ls node_modules/@nova-fe/color/dist/
```

### 3. 测试导入

```bash
# 测试CSS文件
cat node_modules/@nova-fe/color/dist/system/theme.css | head -10

# 测试TypeScript文件
node -e "console.log(require('@nova-fe/color/dist/system/theme-variables'))"
```

## 📊 包信息

当前包配置：

- **包名**: `@nova-fe/color`
- **当前版本**: `1.0.0`
- **主要文件**:
  - `dist/system/theme.css` - CSS变量文件
  - `dist/system/theme-variables.ts` - TypeScript变量定义

## 🚨 常见问题

### 1. 权限问题

```bash
# 错误：403 Forbidden
npm ERR! 403 Forbidden

# 解决：检查登录状态和包名权限
npm whoami
npm owner ls @nova-fe/color
```

### 2. 版本冲突

```bash
# 错误：版本已存在
npm ERR! You cannot publish over the previously published versions

# 解决：更新版本号
npm version patch
```

### 3. 构建文件缺失

```bash
# 错误：找不到dist文件
# 解决：重新构建
npm run build
```

## 🎯 发布策略

### 版本规划

- **补丁版本 (1.0.x)**: Bug修复、颜色微调
- **次要版本 (1.x.0)**: 新增颜色、新功能
- **主要版本 (x.0.0)**: 重大变更、API变化

### 发布频率

- **补丁版本**: 按需发布
- **次要版本**: 月度发布
- **主要版本**: 季度发布

## 📝 发布后操作

1. **更新文档**: 确保README.md反映最新版本
2. **通知团队**: 在团队群中通知新版本发布
3. **更新项目**: 在使用该包的项目中更新版本

## 🔄 回滚策略

如果发布有问题：

```bash
# 废弃有问题的版本
npm deprecate @nova-fe/color@1.0.1 "This version has issues, please use 1.0.0"

# 发布修复版本
npm version patch
npm publish
```

---

**注意**: 本发布流程不包含自动Git提交，需要手动管理代码版本控制。
