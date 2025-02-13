
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

## Profile Completion Calculation

Profile completion percentage is calculated based on the following weights:
- Basic Information (20%): name, email
- Education Details (20%): degree, institution, graduation year, major
- Additional Information (20%): bio, preferred language, timezone
- Address Details (15%): street, city, state, country, zipCode
- Skills & Interests (15%): skills, interests
- Social Links (10%): LinkedIn, Twitter, GitHub

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Input validation using Joi
- Rate limiting
- CORS protection
- Helmet security headers

## Error Handling

The application includes comprehensive error handling:
- Form validation errors
- API error responses
- Network error handling
- Toast notifications for user feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details