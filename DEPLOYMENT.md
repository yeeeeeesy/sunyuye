# GitHub Pages 部署指南

## 快速部署

只需运行一个命令：

```bash
# 替换 "your-repo-name" 为您的实际仓库名
./build.sh your-repo-name
```

然后提交docs文件夹到GitHub即可。

## GitHub Pages 设置

1. 在GitHub仓库中，进入 Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main", Folder: "/ docs"
4. Save

## 提交到GitHub

```bash
git add docs/
git commit -m "GitHub Pages部署"
git push origin main
```

您的网站将在 `https://您的用户名.github.io/您的仓库名` 可用。