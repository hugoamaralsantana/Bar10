const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../../middleware/auth');
const Recipe = require('../../models/Recipe');
const Ingredient = require('../../models/Ingredient');

// @route  GET api/recipes/add
//@desc    Add Recipe
//@access  Public
router.post(
  '/add',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('displayImage', 'Display Image is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check(
        'description',
        'Please add a description with 20 or more characters'
      ).isLength({ min: 20 }),
      check('ingredients', 'More than one ingredient is required').isLength({
        min: 0,
      }),
      check('steps', 'Steps are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      displayImage,
      category,
      region,
      description,
      tools,
      ingredients,
      steps,
      date,
    } = req.body;

    const RecipeFields = {};

    RecipeFields.title = title;
    RecipeFields.displayImage = displayImage;
    RecipeFields.category = category;
    RecipeFields.description = description;
    RecipeFields.steps = steps;
    RecipeFields.date = date;
    RecipeFields.ingredients = ingredients;

    if (tools) {
      RecipeFields.tools = tools;
    }
    if (region) {
      RecipeFields.region = region;
    }

    try {
      let recipe = new Recipe(RecipeFields);

      await recipe.save();

      return res.send('Recipe Created');
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({ msg: 'Server Error' });
    }

    res.send('Recipes Route');
  }
);

module.exports = router;
