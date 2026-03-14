# Recipe Explorer App

A full-stack dynamic Recipe Explorer web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to browse, search, and manage recipes. Users can now create accounts, manage their own recipes, and save favorites to a database.

![Recipe Explorer](https://img.shields.io/badge/Stack-MERN-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🔐 **User Authentication** - Secure signup and login with JWT-based authentication
- 📝 **Recipe Management** - Create, edit, and delete your own custom recipes
- ❤️ **Persistent Favorites** - Save recipes to your account with MongoDB persistence
- 🔍 **Search Recipes** - Search by recipe name or keyword with debounced input
- 🎯 **Smart Filters** - Filter by category and ingredient
- 🔗 **Combined Search & Filter** - Use search and filters together for precise results
- 📱 **Responsive Design** - Beautiful UI that works on mobile, tablet, and desktop
- 🎥 **Video Tutorials** - Embedded YouTube videos for recipe instructions
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast frontend development

## Tech Stack

### Frontend
- **React JS** (v18.2.0)
- **React Router** (v6.20.0) - Client-side routing
- **Axios** - HTTP requests
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool

### Backend
- **Node.js** & **Express** - Server-side logic
- **MongoDB** & **Mongoose** - Database and object modeling
- **JSON Web Token (JWT)** - Secure authentication
- **Bcryptjs** - Password hashing

### Data Source
- **TheMealDB API** - External recipe data source

## Project Structure

```
reciepe_app/
├── server/               # Backend Server
│   ├── config/           # DB configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth & error middleware
│   ├── models/           # Mongoose models (User, Recipe, Favorite)
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── src/                  # Frontend Application
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth context
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Home, Login, Register, Details, etc.)
│   ├── services/         # API services (authApi, recipeApi)
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── netlify.toml          # Deployment configuration
└── tailwind.config.js    # Styling configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reciepe_app
```

2. **Backend Setup**:
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory and add your variables:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Open a new terminal and navigate to the root directory:
     ```bash
     cd reciepe_app
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

4. Open your browser and navigate to `http://localhost:5173`

## API Reference (Internal)

### Auth Endpoints
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Login to existing account
- `GET /api/auth/me` - Get current user profile (requires token)

### Recipe Endpoints
- `GET /api/recipes` - Get all community recipes
- `POST /api/recipes` - Create a new recipe (requires token)
- `GET /api/recipes/:id` - Get recipe details
- `PUT /api/recipes/:id` - Update a recipe (owner only)
- `DELETE /api/recipes/:id` - Delete a recipe (owner only)

### Favorites Endpoints
- `GET /api/favorites` - Get user's favorite recipes (requires token)
- `POST /api/favorites` - Add to favorites (requires token)
- `DELETE /api/favorites/:recipeId` - Remove from favorites (requires token)

## Deployment

The app is prepared for deployment on **Netlify** (Frontend) and **Render/Heroku** (Backend). Ensure all environment variables are set in your deployment platform's dashboard.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the free recipe API
- [TailwindCSS](https://tailwindcss.com/) for the styling
- [Express](https://expressjs.com/) for the backend framework
.com/) for the utility-first CSS framework
- [React](https://react.dev/) for the powerful UI library

## Live Demo

🌐 **Live Site**: [Coming Soon]

📦 **GitHub Repository**: [Coming Soon]

---

Built with ❤️ using React and TailwindCSS
