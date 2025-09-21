# OrbitNuel - Project Management & Collaboration Platform

![OrbitNuel Logo](public/placeholder-logo.png)

A comprehensive project management and team collaboration platform designed to streamline workflow management, enhance team productivity, and provide real-time insights into project progress.

## 🎯 Problem Statement

Modern teams face several challenges in project management and collaboration:

### **Fragmented Workflow Management**
- Teams use multiple disconnected tools for different aspects of project management
- Lack of centralized visibility into project status and team performance
- Difficulty tracking task progress and resource allocation

### **Poor Team Communication & Collaboration**
- Inefficient communication channels leading to miscommunication
- Lack of real-time updates on project changes and task assignments
- Difficulty coordinating between team members across different locations

### **Limited Analytics & Insights**
- No comprehensive view of team productivity and project health
- Difficulty identifying bottlenecks and optimization opportunities
- Lack of data-driven decision making capabilities

### **Scalability & Integration Issues**
- Tools that don't scale with team growth
- Integration challenges with existing workflows
- Data silos preventing comprehensive analysis

## 🚀 Solution

OrbitNuel provides a unified platform that addresses all these challenges through:

### **Centralized Project Management**
- Single dashboard for all projects, tasks, and team activities
- Real-time Kanban boards for visual task management
- Comprehensive project lifecycle tracking from planning to completion

### **Enhanced Team Collaboration**
- Integrated team communication and file sharing
- Real-time notifications and updates
- Role-based access control and permissions

### **Advanced Analytics & Reporting**
- Comprehensive analytics dashboard with key performance indicators
- Real-time insights into team productivity and project health
- Customizable reports and data visualization

### **Scalable Architecture**
- Cloud-native design supporting team growth
- RESTful API for seamless integrations
- Multi-tenant architecture for organization management

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (React-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **State Management**: React Hooks + Context API
- **Charts & Visualization**: Recharts
- **Icons**: Lucide React

### **Backend**
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI

### **Infrastructure & DevOps**
- **Database Hosting**: Neon (Serverless PostgreSQL)
- **Deployment**: Vercel (Frontend) + Railway/Heroku (Backend)
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest

### **Key Dependencies**
```json
{
  "frontend": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "recharts": "^2.8.0",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.3.6"
  },
  "backend": {
    "@nestjs/common": "^11.1.6",
    "@nestjs/typeorm": "^10.0.1",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.2",
    "typeorm": "^0.3.17",
    "bcryptjs": "^2.4.3",
    "class-validator": "^0.14.0"
  }
}
```

## 📋 Features

### **Core Functionality**
- ✅ User Authentication & Authorization
- ✅ Multi-tenant Organization Management
- ✅ Project Creation & Management
- ✅ Task Management with Kanban Boards
- ✅ File Upload & Management
- ✅ Team Member Management
- ✅ Real-time Analytics & Reporting
- ✅ Role-based Access Control

### **Advanced Features**
- 🔄 Real-time Updates & Notifications
- 📊 Comprehensive Analytics Dashboard
- 📁 File Organization & Sharing
- 👥 Team Collaboration Tools
- 📈 Performance Metrics & KPIs
- 🎨 Customizable UI Themes
- 📱 Responsive Design

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and pnpm
- PostgreSQL database (Neon recommended)
- Git

### **Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/adenueltech/orbit-nuel.git
cd orbit-nuel
```

#### **2. Install Dependencies**
```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend
pnpm install
cd ..
```

#### **3. Environment Setup**

##### **Backend Configuration**
Create `.env` file in the `backend` directory:
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server
PORT=3001
```

##### **Frontend Configuration**
Create `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics, etc.
```

#### **4. Database Setup**

##### **Using Neon (Recommended)**
1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to your `.env` file
4. The application will automatically create tables on first run

##### **Using Local PostgreSQL**
```bash
# Install PostgreSQL locally
# Create database
createdb orbit_nuel

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://username:password@localhost:5432/orbit_nuel
```

#### **5. Run Database Migrations**
```bash
cd backend
# Tables are created automatically with synchronize: true
# For production, set synchronize: false and use migrations
```

#### **6. Start the Application**

##### **Development Mode**
```bash
# Terminal 1: Start Backend
cd backend
pnpm run start:dev

# Terminal 2: Start Frontend
pnpm run dev
```

##### **Production Build**
```bash
# Build Frontend
pnpm run build

# Build Backend
cd backend
pnpm run build

# Start Production Servers
pnpm run start:prod  # Backend
pnpm start           # Frontend
```

#### **7. Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api

## 📖 Usage Guide

### **First Time Setup**

1. **Create Organization**
   - Visit the signup page
   - Enter your company details
   - Create your admin account

2. **Invite Team Members**
   - Go to Team section
   - Send invitations via email
   - Assign appropriate roles

3. **Create Your First Project**
   - Navigate to Projects
   - Click "New Project"
   - Set up basic project details

### **Daily Workflow**

#### **Project Management**
1. Create projects with clear objectives
2. Break down projects into manageable tasks
3. Assign tasks to team members
4. Track progress using Kanban boards

#### **Task Management**
1. Create tasks with detailed descriptions
2. Set priorities and due dates
3. Move tasks through workflow stages
4. Update task status in real-time

#### **File Management**
1. Upload project-related files
2. Organize files in folders
3. Share files with team members
4. Track file versions and changes

#### **Team Collaboration**
1. View team member availability
2. Assign tasks based on workload
3. Monitor team performance
4. Generate productivity reports

### **Analytics & Reporting**

#### **Dashboard Overview**
- View key metrics at a glance
- Monitor project health scores
- Track team productivity trends

#### **Custom Reports**
- Generate detailed project reports
- Export data for external analysis
- Schedule automated reports

## 🔧 API Documentation

### **Authentication Endpoints**

```bash
# Register new user
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "password": "securepassword",
  "company": "Tech Corp"
}

# Login
POST /auth/login
Content-Type: application/json

{
  "email": "john@company.com",
  "password": "securepassword"
}
```

### **Protected Endpoints**
All data endpoints require JWT authentication:

```bash
Authorization: Bearer <your-jwt-token>
```

### **Core Endpoints**

```bash
# Projects
GET    /projects           # List all projects
POST   /projects           # Create project
GET    /projects/:id       # Get project details
PUT    /projects/:id       # Update project
DELETE /projects/:id       # Delete project

# Tasks
GET    /tasks             # List all tasks
POST   /tasks             # Create task
GET    /tasks/:id         # Get task details
PUT    /tasks/:id         # Update task
DELETE /tasks/:id         # Delete task

# Users
GET    /users             # List all users
GET    /users/:id         # Get user details

# Files
GET    /files             # List all files
POST   /files             # Upload file
GET    /files/:id         # Get file details
DELETE /files/:id         # Delete file
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for passwords
- **Role-based Access Control**: Granular permissions system
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Secure cross-origin requests

## 📊 Database Schema

### **Core Entities**

#### **Users**
- Authentication and profile information
- Role-based permissions
- Organization membership

#### **Organizations**
- Multi-tenant architecture
- Company settings and preferences

#### **Projects**
- Project lifecycle management
- Team assignments
- Progress tracking

#### **Tasks**
- Task management within projects
- Status tracking and assignments
- Priority and deadline management

#### **Files**
- File upload and storage
- Organization and sharing
- Version control

## 🚀 Deployment

### **Frontend Deployment (Vercel)**

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### **Backend Deployment (Railway)**

1. Create Railway account
2. Connect GitHub repository
3. Configure environment variables
4. Deploy with PostgreSQL database

### **Environment Variables for Production**

```env
# Backend
DATABASE_URL=your_production_db_url
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🧪 Testing

```bash
# Run frontend tests
pnpm test

# Run backend tests
cd backend
pnpm test

# Run e2e tests
pnpm test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### **Development Guidelines**
- Follow TypeScript best practices
- Write comprehensive tests
- Maintain code quality with ESLint
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.orbitnuel.com](https://docs.orbitnuel.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/orbit-nuel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/orbit-nuel/discussions)
- **Email**: support@orbitnuel.com

## 🗺️ Roadmap

### **Phase 1 (Current)**
- ✅ Core project management features
- ✅ Team collaboration tools
- ✅ Basic analytics dashboard

### **Phase 2 (Upcoming)**
- 🔄 Real-time notifications
- 📱 Mobile application
- 🤖 AI-powered insights
- 📊 Advanced reporting

### **Phase 3 (Future)**
- 🌐 Multi-language support
- 🔗 Third-party integrations
- 📈 Machine learning predictions
- ☁️ Advanced cloud features

---

**Built with ❤️ for teams that want to achieve more together.**
