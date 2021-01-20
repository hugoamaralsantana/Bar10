const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);

module.exports = Ingredient;
