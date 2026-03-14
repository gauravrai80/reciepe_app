import Favorite from '../models/Favorite.js';

// @desc    Get all favorites for logged in user
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        const recipeIds = favorites.map((fav) => fav.recipeId);
        res.json({ favorites: recipeIds });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ message: 'Failed to fetch favorites.' });
    }
};

// @desc    Add a recipe to favorites
// @route   POST /api/favorites
// @access  Private
export const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;

        if (!recipeId) {
            return res.status(400).json({ message: 'Recipe ID is required.' });
        }

        // Check if already favorited
        const existing = await Favorite.findOne({
            userId: req.user._id,
            recipeId,
        });

        if (existing) {
            return res.status(400).json({ message: 'Recipe already in favorites.' });
        }

        await Favorite.create({
            userId: req.user._id,
            recipeId,
        });

        // Return updated list
        const favorites = await Favorite.find({ userId: req.user._id });
        const recipeIds = favorites.map((fav) => fav.recipeId);
        res.status(201).json({ favorites: recipeIds });
    } catch (error) {
        console.error('Add favorite error:', error);
        res.status(500).json({ message: 'Failed to add favorite.' });
    }
};

// @desc    Remove a recipe from favorites
// @route   DELETE /api/favorites/:recipeId
// @access  Private
export const removeFavorite = async (req, res) => {
    try {
        await Favorite.findOneAndDelete({
            userId: req.user._id,
            recipeId: req.params.recipeId,
        });

        // Return updated list
        const favorites = await Favorite.find({ userId: req.user._id });
        const recipeIds = favorites.map((fav) => fav.recipeId);
        res.json({ favorites: recipeIds });
    } catch (error) {
        console.error('Remove favorite error:', error);
        res.status(500).json({ message: 'Failed to remove favorite.' });
    }
};
