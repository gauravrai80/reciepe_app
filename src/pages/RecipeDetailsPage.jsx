import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import { getRecipeByIdApi } from '../services/authApi';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError(null);

            try {
                let data = null;
                // Check if ID is a MongoDB ObjectId (24 hex characters)
                if (id && id.length === 24) {
                    try {
                        const customRecipe = await getRecipeByIdApi(id);
                        if (customRecipe) {
                            // Map custom recipe to TheMealDB format
                            data = {
                                idMeal: customRecipe._id,
                                strMeal: customRecipe.title,
                                strMealThumb: customRecipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                strCategory: customRecipe.category || 'Other',
                                strArea: 'Custom',
                                strInstructions: customRecipe.instructions,
                                strYoutube: customRecipe.youtubeUrl || '',
                            };
                            // Add ingredients
                            customRecipe.ingredients.forEach((ing, index) => {
                                data[`strIngredient${index + 1}`] = ing;
                                data[`strMeasure${index + 1}`] = ''; // No strict measures in our simple schema
                            });
                        }
                    } catch (err) {
                        console.error("Failed to fetch custom recipe", err);
                    }
                } else {
                    // Fetch from TheMealDB
                    data = await getRecipeById(id);
                }

                if (data) {
                    setRecipe(data);
                } else {
                    setError('Recipe not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(id);
    };

    // Extract ingredients and measurements
    const getIngredients = () => {
        if (!recipe) return [];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({ ingredient, measure });
            }
        }
        return ingredients;
    };

    // Extract YouTube video ID
    const getYouTubeId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
    if (!recipe) return <ErrorMessage message="Recipe not found" />;

    const ingredients = getIngredients();
    const youtubeId = getYouTubeId(recipe.strYoutube);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to recipes
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Recipe Image */}
                    <div className="relative h-96">
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={handleToggleFavorite}
                            className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-200"
                            aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <svg
                                className={`w-7 h-7 ${isFavorite(id) ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
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
                    </div>

                    {/* Recipe Details */}
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.strMeal}</h1>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {recipe.strCategory && (
                                <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                                    {recipe.strCategory}
                                </span>
                            )}
                            {recipe.strArea && (
                                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                    {recipe.strArea}
                                </span>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {ingredients.map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                                            <span className="text-gray-700">
                                                <span className="font-medium">{item.ingredient}</span>
                                                {item.measure && item.measure.trim() && (
                                                    <span className="text-gray-500"> - {item.measure}</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {recipe.strInstructions}
                                </p>
                            </div>
                        </div>

                        {/* YouTube Video */}
                        {youtubeId && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Tutorial</h2>
                                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        title="Recipe video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecipeDetailsPage;
