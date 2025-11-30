# Recipe Explorer App

A dynamic Recipe Explorer web application built with React JS that allows users to browse, search, and filter recipes using data from TheMealDB API.

![Recipe Explorer](https://img.shields.io/badge/React-18.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🔍 **Search Recipes** - Search by recipe name or keyword with debounced input
- 🎯 **Smart Filters** - Filter by category and ingredient
- 🔗 **Combined Search & Filter** - Use search and filters together for precise results
- ❤️ **Favorites** - Save your favorite recipes with localStorage persistence
- 📱 **Responsive Design** - Beautiful UI that works on mobile, tablet, and desktop
- 🎥 **Video Tutorials** - Embedded YouTube videos for recipe instructions
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## Tech Stack

- **React JS** (v18.2.0) - JavaScript only, no TypeScript
- **React Router** (v6.20.0) - Client-side routing
- **Axios** (v1.6.2) - HTTP requests
- **TailwindCSS** (v3.3.6) - Utility-first CSS framework
- **Vite** (v5.0.8) - Next-generation frontend tooling
- **TheMealDB API** - Free recipe API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reciepe_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
reciepe_app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeList.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── RecipeDetailsPage.jsx
│   │   └── FavoritesPage.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── hooks/           # Custom React hooks
│   │   └── useFavorites.js
│   ├── utils/           # Utility functions
│   │   └── localStorage.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## API Reference

This app uses [TheMealDB API](https://www.themealdb.com/api.php) with the free test API key.

### Key Endpoints Used:
- Search by name: `/search.php?s={query}`
- Get recipe details: `/lookup.php?i={id}`
- Filter by category: `/filter.php?c={category}`
- Filter by ingredient: `/filter.php?i={ingredient}`
- List categories: `/list.php?c=list`
- List ingredients: `/list.php?i=list`

## Features in Detail

### Search Functionality
- Real-time search with 500ms debouncing
- Search by recipe name or keyword
- Clear search button for quick reset

### Filters
- Category filter (Dessert, Seafood, Chicken, etc.)
- Ingredient filter (50 most popular ingredients)
- Combined search + filter for precise results
- Clear filters button

### Recipe Details
- Full recipe information with image
- Category and cuisine area badges
- Complete ingredients list with measurements
- Step-by-step cooking instructions
- Embedded YouTube video tutorial (when available)
- Favorite toggle button

### Favorites
- Add/remove recipes from favorites
- Persistent storage using localStorage
- Dedicated favorites page
- Favorite count in header

## Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod`

3. Configure redirects for SPA routing (already included in `netlify.toml`)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the amazing free recipe API
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) for the powerful UI library

## Live Demo

🌐 **Live Site**: [Coming Soon]

📦 **GitHub Repository**: [Coming Soon]

---

Built with ❤️ using React and TailwindCSS
