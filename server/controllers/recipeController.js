import Recipe from '../models/Recipe.js';

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, prepTime, category, imageUrl, youtubeUrl } = req.body;

        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            instructions,
            prepTime,
            category,
            imageUrl,
            youtubeUrl,
            user: req.user._id // from auth middleware
        });

        res.status(201).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'name');
        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'name');

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Make sure user owns recipe
        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'User not authorized to update this recipe' });
        }

        recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Make sure user owns recipe
        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'User not authorized to delete this recipe' });
        }

        await recipe.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Recipe deleted'
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
