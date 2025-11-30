import React, { useState, useEffect } from 'react';
import { getCategories, getIngredients } from '../services/api';

const FilterBar = ({ onFilterChange, selectedCategory, selectedIngredient }) => {
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [categoriesData, ingredientsData] = await Promise.all([
                    getCategories(),
                    getIngredients(),
                ]);
                setCategories(categoriesData);
                setIngredients(ingredientsData);
            } catch (error) {
                console.error('Error loading filters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    const handleCategoryChange = (e) => {
        onFilterChange({ category: e.target.value, ingredient: selectedIngredient });
    };

    const handleIngredientChange = (e) => {
        onFilterChange({ category: selectedCategory, ingredient: e.target.value });
    };

    const handleClearFilters = () => {
        onFilterChange({ category: '', ingredient: '' });
    };

    const hasActiveFilters = selectedCategory || selectedIngredient;

    if (loading) {
        return (
            <div className="flex gap-4 items-center">
                <div className="h-11 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                <div className="h-11 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="input-field"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.strCategory} value={cat.strCategory}>
                            {cat.strCategory}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1 min-w-[200px]">
                <select
                    value={selectedIngredient}
                    onChange={handleIngredientChange}
                    className="input-field"
                >
                    <option value="">All Ingredients</option>
                    {ingredients.map((ing) => (
                        <option key={ing.strIngredient} value={ing.strIngredient}>
                            {ing.strIngredient}
                        </option>
                    ))}
                </select>
            </div>

            {hasActiveFilters && (
                <button
                    onClick={handleClearFilters}
                    className="btn-secondary whitespace-nowrap"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default FilterBar;
