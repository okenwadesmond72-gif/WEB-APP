# Professional To-Do List Application

## 🎯 Features

### Frontend
- ✅ React 18+ with modern components
- ✅ Local Storage persistence
- ✅ Responsive design (mobile & desktop)
- ✅ Task management (CRUD)
- ✅ Priority levels & categories
- ✅ Search & filter functionality
- ✅ Beautiful UI with animations
- ✅ Statistics dashboard

### Backend API
- ✅ RESTful API with Express.js
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ User authentication (Register/Login)
- ✅ Todo management endpoints
- ✅ Category management
- ✅ Search functionality
- ✅ Statistics calculation
- ✅ CORS enabled

## 📋 Tech Stack

### Frontend
- React 18+
- React Icons
- CSS3 with animations
- Local Storage API
- UUID for unique IDs

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcryptjs for password hashing
- CORS

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn

### Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on: `http://localhost:5000`

### Docker Setup (Full Stack)

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `POST /api/auth/logout` - Logout (Protected)

### Todos
- `GET /api/todos` - Get all todos (Protected)
- `GET /api/todos/:id` - Get single todo (Protected)
- `POST /api/todos` - Create todo (Protected)
- `PUT /api/todos/:id` - Update todo (Protected)
- `PATCH /api/todos/:id/toggle` - Toggle completion (Protected)
- `DELETE /api/todos/:id` - Delete todo (Protected)
- `GET /api/todos/stats` - Get statistics (Protected)
- `GET /api/todos/search?q=query` - Search todos (Protected)
- `DELETE /api/todos/completed` - Clear completed todos (Protected)

### Categories
- `GET /api/categories` - Get all categories (Protected)
- `POST /api/categories` - Create category (Protected)
- `PUT /api/categories/:id` - Update category (Protected)
- `DELETE /api/categories/:id` - Delete category (Protected)

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📁 Project Structure

```
.
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # CSS styles
│   │   ├── utils/          # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                 # Express Backend
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── server.js       # Main server file
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
```

### Frontend

Updated automatically to connect to `http://localhost:5000/api`

## 🧪 Testing

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

## 📤 Deployment

### Deploy Backend (Heroku)

```bash
cd server
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
cd client
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Built with ❤️ by Desmond Okenwa

## 📧 Support

For issues and questions, please create an issue on GitHub.

---

**Ready to use! Start managing your tasks now.** 🎉
