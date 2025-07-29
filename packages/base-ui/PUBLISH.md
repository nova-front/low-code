# 📦 NPM 发布指南

本文档介绍如何将 `@nova-fe/base-ui` 组件库发布到 npm。

## 🚀 快速发布

### 一键发布（推荐）

```bash
# 发布前检查
npm run check:pre-publish

# 发布不同版本
npm run release:patch   # 补丁版本（1.0.1 → 1.0.2）
npm run release:minor   # 次要版本（1.0.1 → 1.1.0）
npm run release:major   # 主要版本（1.0.1 → 2.0.0）
npm run release:beta    # 测试版本（1.0.1 → 1.0.2-beta.0）
```

### GitHub Actions 发布

```bash
# 创建并推送标签自动触发发布
git tag v1.0.2
git push origin v1.0.2
```

## 🛠️ 发布前准备

### 1. 环境检查

确保你的开发环境满足以下要求：

```bash
# 检查 Node.js 版本（推荐 18+）
node --version

# 检查 npm 版本
npm --version

# 检查是否已登录 npm
npm whoami
```

### 2. npm 账户设置

如果还没有 npm 账户，需要先注册：

```bash
# 注册 npm 账户（在浏览器中完成）
npm adduser

# 或者登录已有账户
npm login
```

### 3. 项目配置检查

确保 `package.json` 配置正确：

```json
{
  "name": "@nova-fe/base-ui",
  "version": "1.0.1",
  "description": "Headless UI, 可深度定制UI的设计系统。",
  "main": "./dist/cjs/index.js",
  "module": "./dist/es/index.js",
  "types": "./dist/es/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "import": "./dist/es/index.js",
      "default": "./dist/es/index.js"
    }
  },
  "files": ["dist", "README.md", "CHANGELOG.md"],
  "publishConfig": {
    "access": "public"
  }
}
```

## 📋 发布流程

### 1. 代码质量检查

在发布前，确保代码质量：

```bash
# 运行测试
npm test

# 检查测试覆盖率
npm test -- --coverage

# 构建项目
npm run build

# 检查构建产物
ls -la dist/
```

### 2. 版本管理

使用语义化版本控制：

```bash
# 补丁版本（bug 修复）
npm version patch

# 次要版本（新功能，向后兼容）
npm version minor

# 主要版本（破坏性更改）
npm version major

# 预发布版本
npm version prerelease --preid=beta
```

### 3. 更新变更日志

在发布前更新 `CHANGELOG.md`：

```markdown
## [1.0.2] - 2024-01-XX

### Added

- 新增功能描述

### Changed

- 修改内容描述

### Fixed

- 修复问题描述

### Removed

- 移除内容描述
```

### 4. 发布到 npm

```bash
# 发布到 npm
npm publish

# 发布预发布版本
npm publish --tag beta

# 发布到指定 registry
npm publish --registry https://registry.npmjs.org/
```

## 🔧 发布脚本

可以在 `package.json` 中添加发布脚本：

```json
{
  "scripts": {
    "prepublishOnly": "npm test && npm run build",
    "postpublish": "git push && git push --tags",
    "release:patch": "npm version patch && npm publish",
    "release:minor": "npm version minor && npm publish",
    "release:major": "npm version major && npm publish",
    "release:beta": "npm version prerelease --preid=beta && npm publish --tag beta"
  }
}
```

使用脚本发布：

```bash
# 发布补丁版本
npm run release:patch

# 发布次要版本
npm run release:minor

# 发布主要版本
npm run release:major

# 发布测试版本
npm run release:beta
```

## 📝 发布检查清单

发布前请确认以下事项：

- [ ] 所有测试通过
- [ ] 代码构建成功
- [ ] 版本号已更新
- [ ] CHANGELOG.md 已更新
- [ ] README.md 内容准确
- [ ] package.json 配置正确
- [ ] 已登录正确的 npm 账户
- [ ] 确认发布的文件列表正确

## 🚨 常见问题

### 1. 权限问题

```bash
# 错误：403 Forbidden
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@nova-fe%2fbase-ui

# 解决方案：检查登录状态和包名权限
npm whoami
npm owner ls @nova-fe/base-ui
```

### 2. 版本冲突

```bash
# 错误：版本已存在
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@nova-fe%2fbase-ui
npm ERR! You cannot publish over the previously published versions

# 解决方案：更新版本号
npm version patch
```

### 3. 网络问题

```bash
# 使用淘宝镜像发布
npm publish --registry https://registry.npmjs.org/

# 或者临时设置 registry
npm config set registry https://registry.npmjs.org/
npm publish
npm config set registry https://registry.npmmirror.com/
```

## 📊 发布后验证

发布成功后，进行以下验证：

### 1. 检查 npm 官网

访问 https://www.npmjs.com/package/@nova-fe/base-ui 确认包已发布。

### 2. 本地安装测试

```bash
# 在新目录中测试安装
mkdir test-install && cd test-install
npm init -y
npm install @nova-fe/base-ui

# 测试导入
node -e "console.log(require('@nova-fe/base-ui'))"
```

### 3. 版本检查

```bash
# 检查最新版本
npm view @nova-fe/base-ui version

# 检查所有版本
npm view @nova-fe/base-ui versions --json
```

## 📈 发布后验证

### 1. 检查 npm 官网

访问 https://www.npmjs.com/package/@nova-fe/base-ui

### 2. 本地测试安装

```bash
mkdir test-install && cd test-install
npm init -y
npm install @nova-fe/base-ui@latest

# 测试导入
node -e "console.log(require('@nova-fe/base-ui'))"
```

### 3. 版本检查

```bash
npm view @nova-fe/base-ui version
```

## 🔄 回滚策略

如果发布有问题：

```bash
# 废弃有问题的版本
npm deprecate @nova-fe/base-ui@1.0.2 "This version has critical bugs"

# 发布修复版本
npm run release:patch
```

## 🔗 相关链接

- [npm 官方文档](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [语义化版本](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

**注意**: 发布是不可逆操作，请在发布前仔细检查所有内容。建议先在测试环境中验证包的完整性。
