import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeList from '../components/RecipeList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { searchRecipes, filterByCategory, filterByIngredient, getRandomRecipes } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { getAllRecipesApi } from '../services/authApi';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', ingredient: '' });
    const { favorites, toggleFavorite } = useFavorites();

    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let externalResults = [];
            let customResults = [];

            // 1. Fetch custom backend recipes
            try {
                const customData = await getAllRecipesApi();
                // Map backend format to TheMealDB format for seamless UI rendering
                customResults = customData.map(recipe => ({
                    idMeal: recipe._id,
                    strMeal: recipe.title,
                    strMealThumb: recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    strCategory: recipe.category || 'Other',
                    isCustom: true // Flag to identify custom recipes if needed
                }));
            } catch (backendErr) {
                console.error("Failed to fetch custom recipes:", backendErr);
                // Continue fetching external recipes if backend fails
            }

            // 2. Fetch external recipes from TheMealDB
            if (searchQuery.trim()) {
                externalResults = await searchRecipes(searchQuery);
            } else if (filters.category) {
                externalResults = await filterByCategory(filters.category);
            } else if (filters.ingredient) {
                externalResults = await filterByIngredient(filters.ingredient);
            } else {
                externalResults = await getRandomRecipes(12);
            }

            // Apply additional filtering to external results if both search and filters are active
            if (searchQuery.trim() && (filters.category || filters.ingredient)) {
                if (filters.category) {
                    externalResults = externalResults.filter(r => r.strCategory === filters.category);
                }
                if (filters.ingredient) {
                    const ingredientResults = await filterByIngredient(filters.ingredient);
                    const ingredientIds = new Set(ingredientResults.map(r => r.idMeal));
                    externalResults = externalResults.filter(r => ingredientIds.has(r.idMeal));
                }
            }

            // Apply filters to custom recipes client-side
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                customResults = customResults.filter(r => r.strMeal.toLowerCase().includes(query));
            }
            if (filters.category) {
                customResults = customResults.filter(r => r.strCategory.toLowerCase() === filters.category.toLowerCase());
            }

            // 3. Merge and set recipes
            setRecipes([...customResults, ...externalResults]);
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
            {/* Search and Filters Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Discover Recipes</h2>
                        <p className="text-gray-600 mt-1">Search and filter from around the world</p>
                    </div>
                    <div className="space-y-4">
                        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
                        <FilterBar
                            onFilterChange={handleFilterChange}
                            selectedCategory={filters.category}
                            selectedIngredient={filters.ingredient}
                        />
                    </div>
                </div>
            </div>

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
