const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  displayImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipes',
    required: false,
  },
});

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
