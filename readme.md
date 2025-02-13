# UniSystem - University Management System

A comprehensive full-stack application for managing university student profiles, applications, and academic progress.

## Features

### User Management
- Complete user authentication system
- Profile management with completion tracking
- Social media integration
- Customizable user preferences

### Dashboard Features
- Real-time application status tracking
- Academic performance metrics
- Course management
- Interactive statistics and progress visualization

### Profile Management
Profile completion percentage is calculated based on the following weights:
- Basic Information (20%): name, email
- Education Details (20%): degree, institution, graduation year, major
- Additional Information (20%): bio, preferred language, timezone
- Address Details (15%): street, city, state, country, zipCode
- Skills & Interests (15%): skills, interests
- Social Links (10%): LinkedIn, Twitter, GitHub

## Tech Stack

### Frontend
- React 19.0.0
- React Router DOM for navigation
- TailwindCSS for styling
- Chart.js for data visualization
- HeroIcons for UI icons
- Modern ESLint configuration

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT-based authentication
- Input validation using Joi
- Security features:
  - Password hashing (bcryptjs)
  - Rate limiting
  - CORS protection
  - Helmet security headers

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── home/         # Homepage components
│   │   └── layout/       # Layout components
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   └── data/            # Static data and constants
```

### Backend Structure
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── validations/     # Input validation schemas
│   └── server.js        # Main application file
```

## Security Features

- Secure password hashing
- JWT-based authentication
- Protected routes
- Input validation
- Rate limiting
- CORS protection
- Security headers with Helmet

## Error Handling

The application includes comprehensive error handling:
- Validation errors
- API error responses
- Network error handling
- User-friendly notifications
- Detailed error logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details