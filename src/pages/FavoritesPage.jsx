import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            setLoading(true);
            try {
                const promises = favorites.map(id => getRecipeById(id));
                const recipes = await Promise.all(promises);
                setFavoriteRecipes(recipes.filter(recipe => recipe !== null));
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchFavoriteRecipes();
        } else {
            setLoading(false);
            setFavoriteRecipes([]);
        }
    }, [favorites]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to home
                    </Link>
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
                            <p className="text-gray-600 mt-1">
                                {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <LoadingSpinner />
                ) : favoriteRecipes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                        <svg
                            className="w-24 h-24 text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 mb-6">Start exploring and save your favorite recipes!</p>
                        <Link to="/" className="btn-primary">
                            Explore Recipes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.idMeal}
                                recipe={recipe}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FavoritesPage;
