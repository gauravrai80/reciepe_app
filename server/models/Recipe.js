import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [false, 'Description is optional'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    ingredients: {
        type: [String],
        required: [true, 'At least one ingredient is required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A recipe must have at least one ingredient'
        }
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required']
    },
    prepTime: {
        type: Number,
        required: [false, 'Preparation time is optional (in minutes)'],
        min: [1, 'Preparation time must be at least 1 minute']
    },
    category: {
        type: String,
        required: [false, 'Category is optional'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [false, 'Image URL is optional'],
        trim: true
    },
    youtubeUrl: {
        type: String,
        required: [false, 'YouTube URL is optional'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required to create a recipe']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
