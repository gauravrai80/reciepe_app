import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchFavorites, addFavoriteApi, removeFavoriteApi } from '../services/authApi';

/**
 * Custom hook for managing favorites
 * Uses backend API when user is authenticated
 */
export const useFavorites = () => {
    const { token, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);

    // Load favorites on mount or when auth changes
    useEffect(() => {
        const loadFavorites = async () => {
            if (isAuthenticated && token) {
                try {
                    const data = await fetchFavorites(token);
                    setFavorites(data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    setFavorites([]);
                }
            } else {
                setFavorites([]);
            }
        };
        loadFavorites();
    }, [isAuthenticated, token]);

    // Toggle favorite
    const toggleFavorite = useCallback(async (recipeId) => {
        if (!isAuthenticated || !token) {
            return; // Not logged in
        }

        try {
            let updatedFavorites;
            if (favorites.includes(recipeId)) {
                updatedFavorites = await removeFavoriteApi(token, recipeId);
            } else {
                updatedFavorites = await addFavoriteApi(token, recipeId);
            }
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }, [isAuthenticated, token, favorites]);

    // Check if a recipe is favorited
    const isFavorite = useCallback((recipeId) => {
        return favorites.includes(recipeId);
    }, [favorites]);

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
};
