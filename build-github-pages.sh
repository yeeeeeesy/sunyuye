#!/bin/bash

# Build script for GitHub Pages deployment

echo "🚀 Building for GitHub Pages..."

# Clean previous build
rm -rf docs

# Copy assets to client public folder
echo "📁 Copying assets..."
mkdir -p client/public
cp -r attached_assets/* client/public/ 2>/dev/null || true

# Build the static site to docs folder
echo "🔨 Building static site to docs folder..."
echo "ℹ️  如果您知道GitHub仓库名，请设置环境变量："
echo "   export GITHUB_REPOSITORY=用户名/仓库名"
echo "   然后重新运行此脚本"
echo ""
npx vite build --config vite.config.github.ts

# Copy additional files for GitHub Pages
echo "📄 Setting up GitHub Pages files..."
cp client/public/404.html docs/404.html 2>/dev/null || cat > docs/404.html << 'EOF'
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
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
EOF

echo "✅ Build complete! Files are in the 'docs' folder."
echo "📋 部署到GitHub Pages的步骤："
echo "   1. 将代码推送到您的GitHub仓库"
echo "   2. 在仓库设置中启用GitHub Pages"
echo "   3. 选择源为 'Deploy from a branch'"
echo "   4. 选择分支 'main' 和文件夹 '/docs'"
echo "   5. 您的网站将在 https://您的用户名.github.io/仓库名 上线"

# Test the build
if command -v python3 &> /dev/null; then
    echo ""
    echo "🌐 To test locally, run:"
    echo "   cd dist && python3 -m http.server 8000"
    echo "   Then visit: http://localhost:8000"
elif command -v python &> /dev/null; then
    echo ""
    echo "🌐 To test locally, run:"
    echo "   cd dist && python -m SimpleHTTPServer 8000"
    echo "   Then visit: http://localhost:8000"
fi