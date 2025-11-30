import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * API service for TheMealDB
 * All API calls are centralized here for better maintainability
 */

// Search recipes by name
export const searchRecipes = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search.php?s=${query}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw new Error('Failed to search recipes. Please try again.');
    }
};

// Get recipe by ID
export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
        return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw new Error('Failed to load recipe details. Please try again.');
    }
};

// Get all categories
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/list.php?c=list`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to load categories.');
    }
};

// Get all ingredients
export const getIngredients = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/list.php?i=list`);
        // Return only first 50 ingredients for better UX
        return (response.data.meals || []).slice(0, 50);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        throw new Error('Failed to load ingredients.');
    }
};

// Filter recipes by category
export const filterByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error filtering by category:', error);
        throw new Error('Failed to filter recipes.');
    }
};

// Filter recipes by ingredient
export const filterByIngredient = async (ingredient) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/filter.php?i=${ingredient}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error filtering by ingredient:', error);
        throw new Error('Failed to filter recipes.');
    }
};

// Get random recipes (for initial load)
export const getRandomRecipes = async (count = 12) => {
    try {
        const promises = Array(count).fill(null).map(() =>
            axios.get(`${API_BASE_URL}/random.php`)
        );
        const responses = await Promise.all(promises);
        return responses.map(response => response.data.meals[0]);
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        throw new Error('Failed to load recipes.');
    }
};
