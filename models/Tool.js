const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Tool = mongoose.model('tools', ToolSchema);

module.exports = Tool;
