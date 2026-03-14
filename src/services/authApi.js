import axios from 'axios';

// Use the deployed Render URL in production, and the local proxy in development
const API_URL = import.meta.env.PROD ? 'https://reciepe-app-q1im.onrender.com/api' : '/api';

// Auth API calls
export const registerUser = async ({ name, email, password }) => {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
};

export const loginUser = async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const getCurrentUser = async (token) => {
    const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Favorites API calls
export const fetchFavorites = async (token) => {
    const response = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.favorites;
};

export const addFavoriteApi = async (token, recipeId) => {
    const response = await axios.post(
        `${API_URL}/favorites`,
        { recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.favorites;
};

export const removeFavoriteApi = async (token, recipeId) => {
    const response = await axios.delete(`${API_URL}/favorites/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.favorites;
};

// --- Recipes API calls ---

export const createRecipeApi = async (token, recipeData) => {
    const response = await axios.post(`${API_URL}/recipes`, recipeData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getAllRecipesApi = async () => {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data.data;
};

export const getRecipeByIdApi = async (id) => {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data.data;
};
