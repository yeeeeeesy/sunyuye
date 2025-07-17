# GitHub Pages 部署完整指南

## 关键问题解决：Base Path 配置

正如您指出的，GitHub Pages 无法正确加载资源文件的根本原因是缺少正确的 base 路径配置。

### ✅ 已修复的问题

1. **Base Path 配置**: 已在 `vite.config.github.ts` 中添加动态 base 路径
2. **环境变量支持**: 支持通过 `GITHUB_REPOSITORY` 环境变量指定仓库名
3. **回退机制**: 如果没有指定仓库名，使用相对路径作为回退

## 🚀 部署步骤

### 方法一：使用仓库名构建（推荐）

```bash
# 替换 "your-repo-name" 为您的实际仓库名
./build-with-repo-name.sh your-repo-name
```

### 方法二：设置环境变量

```bash
# 设置环境变量（替换为您的实际用户名和仓库名）
export GITHUB_REPOSITORY="您的用户名/您的仓库名"

# 然后构建
./build-github-pages.sh
```

### 方法三：手动指定 Base Path

直接编辑 `vite.config.github.ts`，将：
```js
base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './',
```

改为：
```js
base: '/您的仓库名/',
```

## 📤 部署到GitHub

构建完成后：

```bash
# 提交docs文件夹
git add docs/
git commit -m "GitHub Pages部署 - 修复资源路径"
git push origin main
```

## ⚙️ GitHub Pages 设置

1. 进入GitHub仓库 → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main"
4. Folder: "/ docs"
5. Save

## 🔍 验证部署

访问 `https://您的用户名.github.io/您的仓库名`

如果看到：
- ✅ 页面正常加载（不是空白页）
- ✅ 样式正确显示
- ✅ 中英文切换正常
- ✅ 深色模式切换正常
- ✅ AI聊天功能可用

说明部署成功！

## 🔧 故障排除

### 1. 如果仍然看到空白页或404错误

检查浏览器开发者工具的Console和Network标签，看是否有资源加载失败的错误。

### 2. 如果资源路径仍然不正确

确保您使用了正确的仓库名重新构建：
```bash
./build-with-repo-name.sh 您的实际仓库名
```

### 3. 如果GitHub Pages显示"Get Pages site failed"

- 等待几分钟让GitHub完成部署
- 确保docs文件夹包含index.html和assets文件夹
- 检查仓库是否为公开状态（或您有GitHub Pro）

## 📝 重要提醒

每次想要更新网站内容时，都需要：
1. 修改源代码
2. 重新运行构建脚本（使用正确的仓库名）
3. 提交并推送docs文件夹的更改

这样才能确保GitHub Pages上的资源路径始终正确。