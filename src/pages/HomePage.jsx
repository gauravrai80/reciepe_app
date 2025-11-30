import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeList from '../components/RecipeList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { searchRecipes, filterByCategory, filterByIngredient, getRandomRecipes } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', ingredient: '' });
    const { favorites, toggleFavorite } = useFavorites();

    // Fetch recipes based on search and filters
    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let results = [];

            // Priority: search query > filters > random recipes
            if (searchQuery.trim()) {
                results = await searchRecipes(searchQuery);
            } else if (filters.category) {
                results = await filterByCategory(filters.category);
            } else if (filters.ingredient) {
                results = await filterByIngredient(filters.ingredient);
            } else {
                results = await getRandomRecipes(12);
            }

            // Apply additional filtering if both search and filters are active
            if (searchQuery.trim() && (filters.category || filters.ingredient)) {
                if (filters.category) {
                    results = results.filter(recipe => recipe.strCategory === filters.category);
                }
                if (filters.ingredient) {
                    // For ingredient filter with search, we need to fetch by ingredient and filter by name
                    const ingredientResults = await filterByIngredient(filters.ingredient);
                    const ingredientIds = new Set(ingredientResults.map(r => r.idMeal));
                    results = results.filter(recipe => ingredientIds.has(recipe.idMeal));
                }
            }

            setRecipes(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, filters]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleRetry = () => {
        fetchRecipes();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Recipe Explorer</h1>
                            <p className="text-gray-600 mt-1">Discover delicious recipes from around the world</p>
                        </div>
                        <Link
                            to="/favorites"
                            className="flex items-center gap-2 btn-primary"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Favorites ({favorites.length})
                        </Link>
                    </div>

                    {/* Search and Filters */}
                    <div className="space-y-4">
                        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
                        <FilterBar
                            onFilterChange={handleFilterChange}
                            selectedCategory={filters.category}
                            selectedIngredient={filters.ingredient}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={handleRetry} />
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
                            </p>
                        </div>
                        <RecipeList
                            recipes={recipes}
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;
