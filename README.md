# Habit Analytics

Fullstack application for tracking and managing your daily habits. Built with React, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Habit Management**: Create, read, update, and delete habits
- **Progress Tracking**: Track daily completions with streaks
- **Statistics**: View habit statistics and completion history
- **Categorization**: Organize habits by category and frequency
- **Access Control**: Users can only see and manage their own habits

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Project Structure

```
habit-analytics/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Habit.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── habitRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── habitController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   └── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/ (Login, Register)
│   │   │   ├── Habits/ (HabitCard, CreateHabit)
│   │   │   └── Common/ (ProtectedRoute)
│   │   ├── pages/
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── habitService.js
│   │   ├── hooks/
│   │   │   └── useHabits.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
├── .env
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Configure environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/habit-analytics
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

### Running Development Server

Start both frontend and backend simultaneously:
```bash
npm run dev
```

Or start them separately:
```bash
npm run server   # Terminal 1: Start backend on port 5000
npm run client   # Terminal 2: Start frontend on port 3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Habits
- `GET /api/habits` - Get all user's habits (protected)
- `POST /api/habits` - Create new habit (protected)
- `GET /api/habits/:id` - Get specific habit (protected)
- `PUT /api/habits/:id` - Update habit (protected)
- `DELETE /api/habits/:id` - Delete habit (protected)
- `POST /api/habits/:id/complete` - Mark habit as completed (protected)
- `GET /api/habits/:id/stats` - Get habit statistics (protected)

## Features Implementation

### ✅ Aутентификация (15 points)
- User registration with validation
- Password hashing with bcrypt
- JWT token generation and verification
- Protected routes with middleware

### ✅ CRUD Операции (20 points)
- GET: Retrieve all habits or specific habit
- POST: Create new habit
- PUT: Update habit details
- DELETE: Remove habit

### ✅ Ограничение доступа (10 points)
- Users only see their own habits
- Can only edit own habits
- Can only delete own habits
- JWT token verification

### ✅ MongoDB подключение (10 points)
- Mongoose schemas for User and Habit
- Proper indexing and validation
- Relationship management

### ✅ Frontend (10 points)
- React components with hooks (useState, useEffect)
- Form handling and validation
- API integration with axios
- JWT token localStorage management

### ✅ Архитектура (5 points)
- Clean folder structure
- Separation of concerns (controllers, routes, middleware)
- Reusable components
- Custom hooks for logic

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Error Handling

The application includes comprehensive error handling:
- Input validation on both client and server
- Proper HTTP status codes
- User-friendly error messages
- Protected routes for authenticated endpoints

## Future Enhancements

- Habit analytics charts and visualizations
- Social features (sharing habits, challenges)
- Mobile app version
- Habit reminders and notifications
- Advanced filtering and search
- Export habit data

## License

MIT
