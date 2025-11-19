# OrbitNuel

A comprehensive project management and collaboration platform built with modern web technologies. OrbitNuel provides teams with powerful tools for task management, file sharing, analytics, and real-time notifications.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Organization Management**: Multi-tenant architecture supporting multiple organizations
- **Project Management**: Create and manage projects with team collaboration
- **Task Management**: Comprehensive task tracking with Kanban board interface
- **File Management**: Upload, organize, and share files with cloud storage integration
- **Real-time Notifications**: WebSocket-based notifications for team communication
- **Analytics Dashboard**: Insights and metrics for project performance
- **Global Search**: Full-text search across projects, tasks, and files

### Technical Features
- **Responsive Design**: Mobile-first design with modern UI components
- **Real-time Updates**: WebSocket integration for live notifications
- **File Upload**: Support for multiple file types with AWS S3 integration
- **API Documentation**: RESTful API with comprehensive endpoints
- **Database**: PostgreSQL with TypeORM for data persistence
- **Security**: Input validation, SQL injection prevention, CORS configuration

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT with Passport.js
- **File Storage**: AWS S3 (production) / Local storage (development)
- **Real-time**: Socket.io
- **Validation**: Class-validator
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: TanStack Query (React Query)
- **Notifications**: Sonner
- **Charts**: Recharts
- **Forms**: React Hook Form

### DevOps & Tools
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest
- **Containerization**: Docker (planned)
- **CI/CD**: GitHub Actions (planned)

## 📋 Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL 13+
- AWS S3 account (for file storage in production)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd orbit-nuel
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies (from root)
cd ..
pnpm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb orbitnuel

# Or using psql
psql -U postgres -c "CREATE DATABASE orbitnuel;"
```

### 4. Environment Configuration

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://postgres:Adenuel123450##@localhost:5432/orbitnuel

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AWS S3 (for production file storage)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Application
NODE_ENV=development
PORT=3001
```

#### Frontend Environment (if needed)
Create `.env.local` in the root directory if you have frontend-specific environment variables.

### 5. Database Migration
```bash
cd backend
pnpm run start:dev
```
The application will automatically create/sync database tables using TypeORM.

### 6. Start Development Servers

#### Terminal 1: Backend
```bash
cd backend
pnpm run start:dev
```

#### Terminal 2: Frontend
```bash
pnpm run dev
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📖 Usage

### User Registration & Login
1. Visit the application and click "Sign Up"
2. Create your account with company details
3. Verify your email (if email verification is enabled)
4. Sign in with your credentials

### Creating Your First Project
1. Navigate to the Projects section
2. Click "Create Project"
3. Add team members and set project details
4. Start creating tasks and uploading files

### API Documentation
Access the API documentation at `http://localhost:3001/api` when the backend is running.

## 🏗️ Project Structure

```
orbit-nuel/
├── app/                    # Next.js frontend application
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── api/               # API routes (if any)
│   └── globals.css        # Global styles
├── backend/               # NestJS backend application
│   ├── src/
│   │   ├── analytics/     # Analytics module
│   │   ├── auth/          # Authentication module
│   │   ├── common/        # Shared utilities
│   │   ├── dashboard/     # Dashboard module
│   │   ├── files/         # File management module
│   │   ├── notifications/ # Notifications module
│   │   ├── organizations/ # Organization management
│   │   ├── projects/      # Project management
│   │   ├── search/        # Search functionality
│   │   ├── settings/      # User settings
│   │   ├── tasks/         # Task management
│   │   ├── users/         # User management
│   │   └── main.ts        # Application entry point
│   ├── test/              # End-to-end tests
│   └── .env               # Environment variables
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── public/                # Static assets
└── styles/                # Additional styles
```

## 🔧 Available Scripts

### Backend Scripts
```bash
cd backend

# Development
pnpm run start:dev          # Start with hot reload
pnpm run start:prod         # Production build
pnpm run build              # Build application
pnpm run test               # Run unit tests
pnpm run test:e2e           # Run e2e tests
pnpm run test:cov           # Test coverage
pnpm run lint               # Run ESLint
pnpm run format             # Run Prettier
```

### Frontend Scripts
```bash
# Development
pnpm run dev                # Start Next.js development server
pnpm run build              # Build for production
pnpm run start              # Start production server
pnpm run lint               # Run ESLint
pnpm run type-check         # TypeScript type checking
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Short-lived token for API access
- **Refresh Token**: Long-lived token for renewing access tokens
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Admin, Manager, Member roles

## 📁 File Storage

### Development
- Files are stored locally in the `backend/uploads/` directory
- Accessible via `/uploads/` route

### Production
- Files are uploaded to AWS S3
- Configurable bucket and region
- Public/private access control

## 🔍 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Organizations
- `GET /organizations` - Get organizations
- `POST /organizations` - Create organization
- `PUT /organizations/:id` - Update organization

### Projects
- `GET /projects` - Get projects
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks
- `GET /tasks` - Get tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Files
- `GET /files` - Get files
- `POST /files/upload` - Upload file
- `GET /files/:id` - Get file details
- `DELETE /files/:id` - Delete file

### Analytics
- `GET /analytics` - Get analytics data

### Notifications
- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/:id/read` - Mark as read

### Dashboard
- `GET /dashboard/overview` - Get dashboard overview

### Search
- `GET /search` - Global search

## 🧪 Testing

```bash
# Backend tests
cd backend
pnpm run test              # Unit tests
pnpm run test:e2e          # End-to-end tests
pnpm run test:cov          # Coverage report

# Frontend tests (if implemented)
pnpm run test
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `pnpm run build`
2. Set production environment variables
3. Configure PostgreSQL database
4. Set up AWS S3 credentials
5. Deploy using your preferred method (Docker, PM2, etc.)

### Frontend Deployment
1. Build the application: `pnpm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Use conventional commits
- Ensure code passes linting and formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Next.js](https://nextjs.com/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Modern UI components
- [TypeORM](https://typeorm.io/) - TypeScript ORM
- [Socket.io](https://socket.io/) - Real-time communication

---

Built with ❤️ using modern web technologies
