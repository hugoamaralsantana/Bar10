const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  displayImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  tools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tools',
    },
  ],
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ingredients',
    },
  ],
  steps: [
    {
      text: {
        type: String,
        required: true,
      },
      optional: {
        type: Boolean,
        default: false,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;
