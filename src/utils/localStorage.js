/**
 * LocalStorage utility functions for managing favorites
 */

const FAVORITES_KEY = 'recipeExplorerFavorites';

// Get all favorites from localStorage
export const getFavorites = () => {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error reading favorites from localStorage:', error);
        return [];
    }
};

// Add a recipe to favorites
export const addFavorite = (recipeId) => {
    try {
        const favorites = getFavorites();
        if (!favorites.includes(recipeId)) {
            favorites.push(recipeId);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
        return favorites;
    } catch (error) {
        console.error('Error adding favorite:', error);
        return getFavorites();
    }
};

// Remove a recipe from favorites
export const removeFavorite = (recipeId) => {
    try {
        const favorites = getFavorites();
        const updatedFavorites = favorites.filter(id => id !== recipeId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return updatedFavorites;
    } catch (error) {
        console.error('Error removing favorite:', error);
        return getFavorites();
    }
};

// Check if a recipe is in favorites
export const isFavorite = (recipeId) => {
    const favorites = getFavorites();
    return favorites.includes(recipeId);
};

// Toggle favorite status
export const toggleFavorite = (recipeId) => {
    if (isFavorite(recipeId)) {
        return removeFavorite(recipeId);
    } else {
        return addFavorite(recipeId);
    }
};
