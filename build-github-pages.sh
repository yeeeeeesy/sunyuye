#!/bin/bash

# Build script for GitHub Pages deployment

echo "🚀 Building for GitHub Pages..."

# Clean previous build
rm -rf dist

# Copy assets to client public folder
echo "📁 Copying assets..."
mkdir -p client/public
cp -r attached_assets/* client/public/ 2>/dev/null || true

# Build the static site
echo "🔨 Building static site..."
npx vite build --config vite.config.github.ts

# Copy additional files for GitHub Pages
echo "📄 Setting up GitHub Pages files..."
cp client/public/404.html dist/404.html 2>/dev/null || echo "404.html will be created by workflow"

echo "✅ Build complete! Files are in the 'dist' folder."
echo "📋 To deploy to GitHub Pages:"
echo "   1. Push this code to your GitHub repository"
echo "   2. Enable GitHub Pages in repository settings"
echo "   3. Set source to 'GitHub Actions'"
echo "   4. The workflow will automatically deploy on push to main"

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