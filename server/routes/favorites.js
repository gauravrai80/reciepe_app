import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.route('/')
    .get(getFavorites)
    .post(addFavorite);

router.delete('/:recipeId', removeFavorite);

export default router;
