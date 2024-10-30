# 50xCourses - Online Learning Platform

A comprehensive full-stack online course marketplace built with Next.js, enabling seamless course creation, management, and learning experiences.

## 🚀 Features

### For Administrators
- **Course Management**
  - Create and publish unlimited courses
  - Organize courses into structured classes
  - Upload and manage course materials
  - Track course sales and revenue
  - Manage student enrollments

- **Financial Management**
  - Receive automatic payments from course sales
  - Track earnings 

### For Users
- **Course Access**
  - Browse comprehensive course catalog
  - Purchase courses with demo credit card
  - Access all purchased course materials
  - Track learning progress
  - Personalize profile with custom avatars

- **Payment System**
  - Demo credit card with 30,000K initial balance
  - Secure transaction processing

## 🛠️ Technical Stack

### Frontend
- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Responsive Design**: Mobile-first approach

### Backend
- **Next.js API Routes**: Server-side functionality
- **Prisma ORM**: Database management
- **PostgreSQL**: Primary database
- **NextAuth.js**: Authentication system
  - Secure credential-based authentication
  - Role-based access control
  - Session management

### Cloud Services
- **Cloudinary**: Media management
  - Course material storage
  - Profile avatar hosting
  - Optimized content delivery

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Cloudinary account
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/hanuchaudhary/courseApp.git
   cd courseApp
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables:
   - Database URL
   - Cloudinary credentials
   - NextAuth secret
   - Other required credentials

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 💻 Usage

### Admin Panel
1. Login with admin credentials
2. Navigate to the admin dashboard
3. Create and manage courses
4. Upload course materials
5. Monitor sales and revenue

### User Interface
1. Register/Login as a user
2. Browse available courses
3. Purchase courses using demo credit card
4. Access course materials
5. Track learning progress
6. Review and rate completed courses

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Hanu Chaudhary** - [GitHub Profile](https://github.com/hanuchaudhary)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Special thanks to the Next.js, Prisma, and Cloudinary communities
