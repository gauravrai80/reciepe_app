import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, favorites, onToggleFavorite }) => {
    if (!recipes || recipes.length === 0) {
        return (
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
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No recipes found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.idMeal)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default RecipeList;
