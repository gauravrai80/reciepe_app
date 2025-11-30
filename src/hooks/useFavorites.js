import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteUtil } from '../utils/localStorage';

/**
 * Custom hook for managing favorites
 * Provides favorites state and toggle function with localStorage sync
 */
export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites on mount
    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    // Toggle favorite and update state
    const toggleFavorite = (recipeId) => {
        const updatedFavorites = toggleFavoriteUtil(recipeId);
        setFavorites(updatedFavorites);
    };

    // Check if a recipe is favorited
    const isFavorite = (recipeId) => {
        return favorites.includes(recipeId);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
};
