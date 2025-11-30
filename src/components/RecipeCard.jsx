import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
    const { idMeal, strMeal, strMealThumb, strCategory } = recipe;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(idMeal);
    };

    return (
        <Link to={`/recipe/${idMeal}`} className="block">
            <div className="card group cursor-pointer">
                <div className="relative overflow-hidden">
                    <img
                        src={strMealThumb}
                        alt={strMeal}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <svg
                            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                    {strCategory && (
                        <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {strCategory}
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {strMeal}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
