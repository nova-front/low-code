# 部署指南

## GitHub Pages 部署

本项目已配置自动部署到 GitHub Pages。

### 自动部署

当以下情况发生时，会自动触发部署：

1. 推送代码到 `main` 或 `master` 分支
2. 修改了 `apps/form-designer/` 目录下的文件
3. 修改了 `.github/workflows/deploy.yml` 文件
4. 手动触发工作流

### 手动部署

你也可以手动触发部署：

1. 进入 GitHub 仓库的 Actions 页面
2. 选择 "Deploy Form Designer to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

### 本地构建测试

在推送到 GitHub 之前，你可以在本地测试构建：

```bash
# 进入 form-designer 目录
cd apps/form-designer

# 构建静态文件
npm run export

# 查看生成的文件
ls -la out/
```

### GitHub Pages 设置

确保在 GitHub 仓库设置中启用了 GitHub Pages：

1. 进入仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "GitHub Actions"

### 访问地址

部署成功后，应用将在以下地址可用：

```
https://<username>.github.io/<repository-name>/
```

### 配置说明

#### Next.js 配置 (next.config.mjs)

```javascript
const nextConfig = {
  output: 'export',           // 启用静态导出
  trailingSlash: true,        // 添加尾部斜杠
  images: {
    unoptimized: true,        // 禁用图片优化（GitHub Pages 不支持）
  },
  eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
  },
  typescript: {
    ignoreBuildErrors: true,  // 构建时忽略 TypeScript 错误
  },
};
```

#### 支持的路由

- `/` - 首页
- `/builder/` - 表单设计器
- `/docs/` - 组件文档
- `/demo/` - 演示页面
- `/questionnaire/` - 问卷调查

### 故障排除

#### 构建失败

如果构建失败，检查：

1. TypeScript 类型错误
2. ESLint 配置问题
3. 依赖版本冲突

#### 页面无法访问

如果部署成功但页面无法访问：

1. 检查 GitHub Pages 设置
2. 确认 `.nojekyll` 文件存在
3. 检查路由配置

#### 样式或资源加载失败

如果样式或静态资源无法加载：

1. 检查 `trailingSlash: true` 配置
2. 确认 `images.unoptimized: true` 设置
3. 检查相对路径引用
