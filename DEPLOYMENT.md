# GitHub Pages Deployment Guide

## Quick Start

Your portfolio is now ready for GitHub Pages! Follow these steps:

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial portfolio commit"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository settings
2. Scroll to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically trigger on your next push

### 3. Access Your Live Site

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

## Features in GitHub Pages Version

### ✅ What Works
- **Full Portfolio Display**: All sections, education, experience, projects
- **Bilingual Support**: Complete English/Chinese translation switching
- **Dark Mode**: Full theme toggle functionality
- **AI Chatbot**: Static responses about your background and experience
- **Resume Download**: PDF download functionality
- **Responsive Design**: Works on all devices
- **SEO Optimization**: Proper meta tags and structure

### 🔄 Automatic Fallbacks
- **API Calls**: Gracefully fall back to static data when no server available
- **Chat Responses**: Pre-configured intelligent responses about your background
- **Asset Serving**: Images and resume served from static files

## Local Testing

To test the GitHub Pages build locally:

```bash
# Build for GitHub Pages
./build-github-pages.sh

# Test locally (choose one method)
cd dist && python3 -m http.server 8000
# OR
cd dist && python -m SimpleHTTPServer 8000
# OR use any static file server

# Visit http://localhost:8000
```

## Customization for GitHub Pages

### Update Your Information
1. **Translations**: Edit `client/src/lib/translations.ts`
2. **Static Responses**: Modify `client/src/lib/static-data.ts`
3. **Resume**: Replace `attached_assets/resume_1752651300851.pdf`
4. **Profile Photo**: Replace `attached_assets/1_1752651304739.jpg`

### Repository-Specific Configuration
If you need to deploy to a subdirectory (e.g., `username.github.io/portfolio`):

1. Update `vite.config.github.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/', // Change this to your repository name
  // ... rest of config
});
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (see workflow file)

### 404 Errors on Refresh
- The workflow automatically handles SPA routing
- Make sure the 404.html redirect script is working

### Assets Not Loading
- Verify files are in `attached_assets/` directory
- Check that build script copies them to `client/public/`

## Advanced Configuration

### Custom Domain
1. Add `CNAME` file to `client/public/` with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in repository settings

### Environment Variables
For additional API integrations:
1. Add secrets to repository settings
2. Update GitHub Actions workflow to include them
3. Modify the deployment configuration as needed

## Support

The portfolio automatically detects GitHub Pages hosting and switches to static mode. Both server-based (development) and static (GitHub Pages) deployments are fully supported.