# DialSurge

AI-Powered Outbound Calling at Scale

## Overview

DialSurge is a modern web application built with React + Vite frontend and Node.js backend, featuring a beautiful login page with real-time form validation and secure authentication.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Custom hooks** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security
- **CORS** for cross-origin requests
- **Rate limiting** for API protection

## Project Structure

```
dialsurge/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── ...
│   ├── package.json
│   └── ...
├── package.json             # Root package.json with scripts
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and install all dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
# Frontend environment
cp frontend/.env.example frontend/.env

# Backend environment
cp backend/.env.example backend/.env
```

3. Start the development servers:
```bash
npm run dev
```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:3001) servers concurrently.

## Available Scripts

### Development
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server

### Production
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode

### Installation
- `npm run install:all` - Install dependencies for root, frontend, and backend

## Features

### Authentication
- Secure login with JWT tokens
- Password hashing with bcrypt
- Form validation with real-time feedback
- Session management with localStorage
- Rate limiting for API protection

### UI/UX
- Responsive design with TailwindCSS
- Beautiful animated login page
- Real-time form validation
- Loading states and error handling
- Accessibility features

### Security
- CORS protection
- Helmet security headers
- Rate limiting
- Input validation
- Secure password storage

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Health Check
- `GET /api/health` - Server health check

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email**: demo@dialsurge.com
- **Password**: demo123

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the GitHub repository.
