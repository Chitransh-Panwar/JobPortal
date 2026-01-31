# JobPortal - Full Stack Job Recruitment Platform

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

**A modern, full-featured job portal connecting job seekers with employers.**

🌐 **Live Demo:** [https://jobportal-1-w33v.onrender.com](https://jobportal-1-w33v.onrender.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

JobPortal is a comprehensive MERN stack application that streamlines the job recruitment process. It provides separate interfaces for **job seekers (students)** and **employers (recruiters)**, enabling seamless job posting, application submission, and candidate management.

### Key Highlights

- 🎯 **Dual Role System** - Separate dashboards for students and recruiters
- 🔍 **Smart Job Search** - Filter and search jobs by role, company, and keywords
- 📄 **Resume Upload** - Support for PDF resume submissions
- ✅ **Application Tracking** - Real-time status updates on job applications
- 🏢 **Company Management** - Recruiters can manage their company profiles
- 📱 **Responsive Design** - Fully responsive UI built with Tailwind CSS

---

## Features

### For Job Seekers (Students)

| Feature | Description |
|---------|-------------|
| **User Registration/Login** | Secure authentication with JWT |
| **Profile Management** | Update personal info, skills, and upload resume |
| **Browse Jobs** | View all available job openings with detailed descriptions |
| **Search & Filter** | Find jobs by title, company, or keywords |
| **Apply to Jobs** | One-click application with resume attachment |
| **Application History** | Track all applied jobs and their status |

### For Employers (Recruiters)

| Feature | Description |
|---------|-------------|
| **Company Registration** | Create and manage company profiles |
| **Post Jobs** | Create new job listings with detailed requirements |
| **Manage Jobs** | Edit, update, or delete job postings |
| **View Applicants** | See all candidates who applied to your jobs |
| **Update Status** | Accept or reject applications |

### General Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🍪 **Cookie-based Sessions** - Persistent login sessions
- 🌐 **CORS Enabled** - Cross-origin resource sharing configured
- 📊 **RESTful API** - Well-structured API endpoints
- 🖼️ **Cloudinary Integration** - For image/logo uploads
- 📧 **Ready for Email Integration** - Nodemailer configured

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Redux Toolkit** | State management |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Shadcn/UI** | Modern UI components |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **Bcrypt.js** | Password hashing |
| **Cloudinary** | Image storage |
| **Multer** | File upload handling |

---

## Screenshots

### Homepage
![Homepage](./Screenshot%202026-01-27%20213315.png)
*Landing page with job search and featured job listings*

### Job Listings
![Job Listings](./Screenshot%202026-01-27%20213331.png)
*Browse latest and top job openings from various companies*

### Company Dashboard
![Company Dashboard](./Screenshot%202026-01-27%20213432.png)
*Recruiters can manage their registered companies*

### User Profile
![User Profile](./Screenshot%202026-01-27%20213525.png)
*Student profile with skills, resume, and applied jobs tracking*

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/Chitransh-Panwar/JobPortal.git
cd JobPortal
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env

# Start the server
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
cd frontend
npm run build
```

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Server
PORT=3000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Register new user |
| POST | `/user/login` | User login |
| POST | `/user/logout` | User logout |
| POST | `/user/profile/update` | Update user profile |

### Company Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/company/register` | Register new company |
| GET | `/company/get` | Get all companies |
| GET | `/company/get/:id` | Get company by ID |
| PUT | `/company/update/:id` | Update company |

### Job Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/job/post` | Post new job |
| GET | `/job/get` | Get all jobs |
| GET | `/job/get/:id` | Get job by ID |
| GET | `/job/admin` | Get admin jobs |
| PUT | `/job/update/:id` | Update job |

### Application Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/application/apply/:id` | Apply for job |
| GET | `/application/get` | Get all applications |
| GET | `/application/:id` | Get application by ID |
| PUT | `/application/status/:id` | Update application status |

---

## Project Structure

```
JobPortal/
├── backend/
│   ├── controllers/         # Route controllers
│   │   ├── user.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── application.controller.js
│   ├── models/              # Mongoose models
│   │   ├── user.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── application.model.js
│   ├── routes/              # API routes
│   │   ├── user.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── application.route.js
│   ├── middlewares/         # Custom middlewares
│   │   └── isAuthenticated.js
│   ├── utils/               # Utility functions
│   │   ├── db.js
│   │   └── cloudinary.js
│   └── index.js             # Server entry point
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store & slices
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
└── README.md
```

---

## User Roles

### Student (Job Seeker)

1. **Registration** - Create account with email, password, and role
2. **Complete Profile** - Add skills, phone number, and upload resume
3. **Browse Jobs** - Search and filter available positions
4. **Apply** - Submit applications with resume
5. **Track Applications** - View status of all applications

### Recruiter (Employer)

1. **Registration** - Create account with recruiter role
2. **Register Company** - Add company details and logo
3. **Post Jobs** - Create job listings with requirements
4. **Manage Applications** - Review applicants and update status

---

## Future Enhancements

- [ ] **Email Notifications** - Automated emails for application updates
- [ ] **Advanced Search** - Filter by salary, location, experience
- [ ] **Job Categories** - Categorize jobs by industry
- [ ] **Saved Jobs** - Bookmark favorite job listings
- [ ] **Company Reviews** - Rate and review companies
- [ ] **Chat System** - Direct messaging between recruiters and candidates
- [ ] **Analytics Dashboard** - Visualize application statistics
- [ ] **Mobile App** - React Native mobile application

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Ideas

- Improve UI/UX design
- Add more filtering options
- Implement real-time notifications
- Add unit and integration tests
- Optimize database queries

---

## License

This project is licensed under the MIT License.

---

## Author

**Chitransh Panwar**

- GitHub: [@Chitransh-Panwar](https://github.com/Chitransh-Panwar)
- Email: rajchaudhary100102@gmail.com

---

<p align="center">
  <i>Built with ❤️ using MERN Stack</i>
</p>
