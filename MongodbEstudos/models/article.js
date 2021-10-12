const mongoose = require('mongoose');

const articlesModel = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  date: {type: Date, default: Date.now},
  special: Boolean,

  // Herançã
  resume: {
    content: String,
    author: String
  }
})

module.exports = articlesModel;