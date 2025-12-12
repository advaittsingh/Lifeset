# LifeSet Admin Web

Standalone admin panel web application for the LifeSet Platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file with your backend API URL
echo "VITE_API_URL=https://lifeset-backend.vercel.app/api/v1" > .env
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `services/` - API services
  - `store/` - State management

## Deployment

This project is deployed on Vercel. The backend API URL is configured via environment variables.

**Production URL:** https://lifeset-admin-nymrcg900-curvvtech.vercel.app

**Backend API:** https://lifeset-backend.vercel.app/api/v1

## Notes

This is a standalone version of the admin web application, previously part of a monorepo.
