#!/bin/bash

# GitHub Pages 部署脚本 - 指定仓库名版本

# 检查是否提供了仓库名参数
if [ $# -eq 0 ]; then
    echo "使用方法: $0 <仓库名>"
    echo "例如: $0 my-portfolio"
    echo ""
    echo "或者设置环境变量后运行 build-github-pages.sh:"
    echo "export GITHUB_REPOSITORY=用户名/仓库名"
    echo "./build-github-pages.sh"
    exit 1
fi

REPO_NAME=$1

echo "🚀 Building for GitHub Pages with repository: $REPO_NAME"

# 复制资源文件
echo "📁 Copying assets..."
mkdir -p client/public
cp -r attached_assets/* client/public/ 2>/dev/null || true

# 设置环境变量并构建
echo "🔨 Building static site to docs folder..."
export GITHUB_REPOSITORY="username/$REPO_NAME"
npx vite build --config vite.config.github.ts

# 创建404.html文件用于SPA路由支持
echo "📄 Setting up GitHub Pages files..."
cat > docs/404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sunyu Ye - Portfolio</title>
  <script>
    // GitHub Pages SPA routing fix
    const path = window.location.pathname.slice(1);
    if (path) {
      window.history.replaceState(null, null, '/?' + path);
    }
  </script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOF

echo "✅ Build complete! Files are in the 'docs' folder."
echo "📋 部署到GitHub Pages的步骤："
echo "   1. 将代码推送到您的GitHub仓库"
echo "   2. 在仓库设置中启用GitHub Pages"
echo "   3. 选择源为 'Deploy from a branch'"
echo "   4. 选择分支 'main' 和文件夹 '/docs'"
echo "   5. 您的网站将在 https://您的用户名.github.io/$REPO_NAME 上线"