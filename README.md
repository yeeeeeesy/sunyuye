# Sunyu Ye - Portfolio Website

A modern, responsive portfolio website for Sunyu Ye, an Economics student at Zhejiang University, featuring bilingual support (English/Chinese), dark mode, and an AI-powered chatbot.

## Features

- **Responsive Design**: Fixed sidebar layout with scrollable content area
- **Bilingual Support**: Full English and Chinese translations
- **Dark Mode**: Complete dark/light theme toggle
- **AI Chatbot**: Interactive assistant to answer questions about background and experience
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **SEO Optimized**: Proper meta tags and structured content

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query
- **Routing**: Wouter (lightweight client-side routing)
- **Build Tool**: Vite with ESBuild

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages

This project is configured for easy deployment to GitHub Pages:

1. **Fork/Clone the repository**
2. **Enable GitHub Pages** in your repository settings
3. **Configure the workflow**: The `.github/workflows/deploy.yml` file will automatically build and deploy on push to main
4. **Set up environment**: Make sure to enable GitHub Actions in your repository

The site will be available at `https://yourusername.github.io/repository-name`

### Manual Deployment

For other hosting platforms:

```bash
# Build the static site
npm run build

# The built files will be in the `dist` folder
# Upload the contents of `dist` to your hosting provider
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and services
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Application entry point
│   ├── public/             # Static assets
│   └── index.html          # HTML template
├── server/                 # Express server (development only)
├── shared/                 # Shared types and schemas
├── .github/workflows/      # GitHub Actions
└── attached_assets/        # Portfolio assets (resume, images)
```

## Configuration

### Static Deployment

The application automatically detects GitHub Pages deployment and:
- Uses static data instead of API calls
- Provides fallback responses for the AI chatbot
- Serves assets from the public directory

### Customization

To customize the portfolio:

1. **Update translations**: Edit `client/src/lib/translations.ts`
2. **Modify static data**: Update `client/src/lib/static-data.ts`
3. **Change styling**: Customize colors in `client/src/index.css`
4. **Add content**: Replace assets in `attached_assets/`

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- **Email**: yesunnyu@gmail.com
- **LinkedIn**: [Sunyu Ye](https://www.linkedin.com/in/sunyu-ye-a3a806373)
- **GitHub**: [yeeeeeesy](https://github.com/yeeeeeesy)