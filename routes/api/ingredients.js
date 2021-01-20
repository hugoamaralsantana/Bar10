const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../../middleware/auth');
const Ingredient = require('../../models/Ingredient');

// @route  GET api/ingredient/:name
//@desc    Add Ingredient
//@access  Private
router.post(
  '/add',
  [
    auth,
    [
      check('name', 'Ingredient name is required').not().isEmpty(),
      check('category', 'Ingredient Category is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category } = req.body;

    const IngredientFields = {};

    IngredientFields.name = name;
    IngredientFields.category = category;

    try {
      let ingredient = await Ingredient.findOne({ name });

      if (ingredient) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ingredient already exists' }] });
      }

      ingredient = new Ingredient(IngredientFields);

      await ingredient.save();

      res.send('Ingredient Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
