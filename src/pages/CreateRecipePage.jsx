import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createRecipeApi } from '../services/authApi';

const CreateRecipePage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructions: '',
        prepTime: '',
        category: '',
        imageUrl: '',
        youtubeUrl: '',
    });
    const [ingredients, setIngredients] = useState(['']);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, '']);
    };

    const removeIngredientField = (index) => {
        if (ingredients.length > 1) {
            const newIngredients = [...ingredients];
            newIngredients.splice(index, 1);
            setIngredients(newIngredients);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.title.trim()) return setError('Title is required');
        if (!formData.instructions.trim()) return setError('Instructions are required');
        
        const filteredIngredients = ingredients.filter(i => i.trim() !== '');
        if (filteredIngredients.length === 0) return setError('At least one ingredient is required');

        setIsLoading(true);

        try {
            await createRecipeApi(token, {
                ...formData,
                ingredients: filteredIngredients,
                prepTime: formData.prepTime ? Number(formData.prepTime) : undefined
            });
            navigate('/'); // Redirect to home page on success
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create recipe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-8 py-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-900">Create New Recipe</h2>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title & Category Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Recipe Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                    placeholder="e.g. Classic Margherita Pizza"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                    placeholder="e.g. Italian, Dessert"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl"
                                id="imageUrl"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="https://example.com/image.jpg"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </div>

                        {/* YouTube URL */}
                        <div>
                            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL (Optional)</label>
                            <input
                                type="url"
                                name="youtubeUrl"
                                id="youtubeUrl"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                                placeholder="A brief description of your recipe..."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients *</label>
                            <div className="space-y-3">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            required
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                            placeholder={`Ingredient ${index + 1}`}
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeIngredientField(index)}
                                            disabled={ingredients.length === 1}
                                            className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addIngredientField}
                                className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add another ingredient
                            </button>
                        </div>

                        {/* Instructions */}
                        <div>
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Instructions *</label>
                            <textarea
                                name="instructions"
                                id="instructions"
                                required
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="Step-by-step cooking instructions..."
                                value={formData.instructions}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Prep Time */}
                        <div>
                            <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">Prep & Cook Time (minutes)</label>
                            <input
                                type="number"
                                name="prepTime"
                                id="prepTime"
                                min="1"
                                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="e.g. 45"
                                value={formData.prepTime}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Recipe...
                                    </>
                                ) : (
                                    'Create Recipe'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;
