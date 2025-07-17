# replit.md

## Overview

This is a personal portfolio website for Sunyu Ye, an Economics student at Zhejiang University. The application is built as a full-stack web application featuring a modern React frontend with an Express.js backend, designed to showcase Sunyu's academic background, research experience, and professional qualifications. The site includes an AI-powered chatbot that can answer questions about Sunyu's background and experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React application built with Vite, using TypeScript and modern UI components
- **Backend**: Express.js server providing REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **AI Integration**: OpenAI API for the intelligent chatbot feature
- **Styling**: Tailwind CSS with shadcn/ui component library

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: Custom language context supporting English and Chinese

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **External Services**: OpenAI API integration for chatbot functionality
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot-reload capability with Vite middleware integration

### Database Schema
- **Users Table**: Basic user authentication schema (id, username, password)
- **Chat Messages**: Stores chatbot conversations (sessionId, message, response, timestamp)
- **Portfolio Content**: Multilingual content management (section, content, language, isActive)

### AI Chatbot System
- **Provider**: OpenAI GPT-4o model
- **Context**: Pre-loaded with comprehensive information about Sunyu's background
- **Session Management**: Unique session IDs for conversation tracking
- **History**: Maintains chat history for context-aware responses

## Data Flow

1. **Content Display**: Portfolio content is fetched from the backend storage and displayed in multilingual format
2. **Chat Interaction**: User messages are sent to the backend, enriched with context about Sunyu, and forwarded to OpenAI
3. **Language Switching**: Frontend language context manages translations and content localization
4. **Resume Download**: Static file serving for resume PDF downloads

## External Dependencies

### Production Dependencies
- **UI Components**: Comprehensive Radix UI component suite for accessible interfaces
- **Database**: Neon serverless PostgreSQL for cloud database hosting
- **AI Service**: OpenAI API for natural language processing
- **Session Management**: PostgreSQL-based session storage
- **Date Handling**: date-fns for date manipulation and formatting

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migration and schema management
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild compiles TypeScript server code to `dist/index.js`
- **Database**: Drizzle migrations manage schema updates

### Environment Configuration
- **Development**: Uses Vite dev server with Express API proxy
- **Production**: Serves static files through Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- **AI Service**: Requires `OPENAI_API_KEY` for chatbot functionality

### Hosting Considerations
- **Static Assets**: Frontend builds to standard web-ready format
- **API Server**: Express server handles both API routes and static file serving
- **Database**: Configured for Neon serverless PostgreSQL
- **CDN Ready**: Static assets can be served from CDN if needed

The application is designed to be deployment-ready for platforms like Vercel, Netlify, traditional hosting providers, and **GitHub Pages**, with environment-based configuration for seamless transitions between development and production environments.

## GitHub Pages Deployment

### Recent Updates (July 17, 2025)
- **Added GitHub Pages Support**: Created static deployment configuration with fallback systems
- **Static Data Integration**: Implemented client-side data serving for portfolio content and AI chatbot responses
- **GitHub Actions Workflow**: Automated build and deployment pipeline for GitHub Pages
- **SPA Routing Support**: Added client-side routing compatibility for GitHub Pages hosting
- **Docs Folder Deployment**: Configured build output to docs/ folder for standard GitHub Pages deployment
- **Chinese Documentation**: Added comprehensive Chinese deployment guide (GitHub部署指南.md)

### GitHub Pages Configuration
- **Build Configuration**: `vite.config.github.ts` for static site generation with docs/ output
- **Deployment Workflow**: `.github/workflows/deploy.yml` for automated CI/CD  
- **Manual Build Script**: `build-github-pages.sh` for local testing and manual deployment
- **Static Fallbacks**: AI chatbot and portfolio data work without backend API
- **Asset Management**: Resume and images served from static public directory
- **Routing Support**: Custom 404.html and index.html for single-page application routing
- **Docs Folder**: Standard GitHub Pages deployment using docs/ folder from main branch

### Deployment Steps
1. **Repository Setup**: Push code to GitHub repository
2. **Local Build**: Run `./build-github-pages.sh` to generate docs/ folder
3. **Commit Docs**: Add and commit the docs/ folder to git
4. **Enable GitHub Pages**: Configure repository settings to deploy from main branch docs/ folder  
5. **Live Site**: Portfolio available at https://username.github.io/repository-name
6. **Static Assets**: Resume and profile images automatically included in build

The dual deployment strategy allows the application to work both as a full-stack application (with Express server and OpenAI integration) and as a static site (with fallback responses and client-side data) depending on the hosting environment.