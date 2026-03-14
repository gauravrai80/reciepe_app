import express from 'express';
import {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} from '../controllers/recipeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getAllRecipes)
    .post(auth, createRecipe);

router.route('/:id')
    .get(getRecipeById)
    .put(auth, updateRecipe)
    .delete(auth, deleteRecipe);

export default router;
