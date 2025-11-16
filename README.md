# Todo List Application

A modern, full-stack Todo List application with a React frontend and Express/MongoDB backend. Features a minimalist UI with real-time task management, checkboxes for completion status, and delete functionality.

## 🎨 Features

- **Modern Minimalist UI**: Centered card design with gradient background
- **Real-time Task Management**: Add, complete, and delete todos
- **Checkbox Toggle**: Click checkboxes to mark tasks complete with visual feedback (strikethrough, faded)
- **Delete Tasks**: Remove todos with a trash icon and optimistic UI updates
- **Loading States**: Spinner indicators during API operations
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Clean, standard API endpoints
- **MongoDB Integration**: Persistent data storage

## 📁 Project Structure

```
TodoList/
├── server/              # Express backend
│   ├── models/
│   │   └── todo.js     # MongoDB Todo schema
│   ├── index.js        # Express server & routes
│   ├── package.json
│   └── .gitignore
└── todolist/           # React + Vite frontend
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── Create.jsx  # Task input component
    │   ├── home.jsx    # Main todo list component
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    ├── README.md
    └── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd TodoList
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../todolist
   npm install
   ```

### Running the Application

**Terminal 1 - Backend Server**

```bash
cd server
npm start
```

Expected output:

```
✅ MongoDB connected
Server is running on port 5001
```

**Terminal 2 - Frontend Development Server**

```bash
cd todolist
npm run dev
```

Open the local URL provided by Vite (typically http://localhost:5173 or http://localhost:5174)

## 📚 API Endpoints

### Modern RESTful Endpoints (Recommended)

- **POST** `/api/todos` - Create a new todo

  - Body: `{ "task": "string" }`
  - Returns: Created todo document with `_id` and `completed` fields

- **GET** `/api/todos` - Fetch all todos

  - Returns: Array of todo documents sorted by creation date (newest first)

- **PATCH** `/api/todos/:id` - Update a todo (toggle completion status)

  - Body: `{ "completed": true/false }`
  - Returns: Updated todo document

- **DELETE** `/api/todos/:id` - Delete a todo
  - Returns: `{ "success": true }`

### Legacy Endpoints (for compatibility)

- **POST** `/add` - Create a todo
- **GET** `/todos` - Fetch all todos
- **PATCH** `/update/:id` - Update completion status

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **CSS3** - Styling with gradients, animations, and flexbox

### Backend

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemon** - Development auto-reload
- **CORS** - Cross-origin resource sharing

## 📖 Component Overview

### Create.jsx

Handles task input, validation, and creation. Shows success/error messages and loading states.

### home.jsx

Main container managing the todo list. Handles fetching, toggling completion, and deleting tasks with optimistic UI updates.

### App.css

Modern minimalist styling including:

- Gradient background
- Centered card layout
- Animated hover effects
- Responsive design rules
- Loading spinner animations

## 🔄 Data Flow

1. User enters task text in input field
2. Click "Add" button → POST to `/api/todos`
3. Success message shows, input clears
4. New task fetches and appears in list with checkbox
5. Click checkbox → PATCH `/api/todos/:id` with `completed` status
6. UI updates immediately (optimistic), todo gets strikethrough effect
7. Click trash icon → DELETE `/api/todos/:id`
8. Task removed from UI and database

## 🧪 Testing the App

1. Add a new task - verify input clears and success message appears
2. Check the checkbox - verify strikethrough and API call
3. Delete a task - verify it's removed from UI and database
4. Refresh page - verify tasks persist (data from MongoDB)

## 📝 Environment Variables

Create a `.env` file in the `server/` folder if you want to customize:

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/demo
NODE_ENV=development
```

## 🐛 Troubleshooting

**Port 5001 already in use**

```bash
# Find the process using port 5001
netstat -ano | findstr :5001

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

**MongoDB connection fails**

- Ensure MongoDB is running: `mongosh` or check MongoDB service status
- Verify connection string in `server/index.js`

**Frontend not loading**

- Check Vite dev server is running and accessible at reported URL
- Clear browser cache and restart dev server

## 📦 Building for Production

### Frontend

```bash
cd todolist
npm run build
```

Creates optimized build in `dist/` folder

### Backend

No build step needed; use `npm start` with proper environment variables

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task filtering and sorting
- [ ] Dark mode toggle
- [ ] Task priority levels
- [ ] Bulk operations

---

**Happy organizing! 🚀**
