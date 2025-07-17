#!/bin/bash

# 简化的GitHub Pages部署脚本

echo "🚀 准备部署到GitHub Pages..."

# 确保我们在正确的分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  请切换到main分支后再运行此脚本"
    echo "   运行: git checkout main"
    exit 1
fi

# 构建静态文件到docs文件夹
echo "📁 构建静态文件..."
chmod +x build-github-pages.sh
./build-github-pages.sh

# 检查docs文件夹是否存在
if [ ! -d "docs" ]; then
    echo "❌ docs文件夹不存在，构建失败"
    exit 1
fi

# 添加并提交docs文件夹
echo "📤 提交docs文件夹到git..."
git add docs/

# 检查是否有更改
if git diff --staged --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
    git commit -m "部署到GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ 已提交更改"
fi

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

echo ""
echo "✅ 部署完成！"
echo "📋 接下来的步骤："
echo "   1. 进入您的GitHub仓库设置"
echo "   2. 找到 'Pages' 设置"
echo "   3. 在 'Source' 下选择 'Deploy from a branch'"
echo "   4. 选择分支: main"
echo "   5. 选择文件夹: /docs"
echo "   6. 点击 Save"
echo ""
echo "🌐 您的网站将在几分钟后在以下地址可用："
echo "   https://您的用户名.github.io/仓库名"