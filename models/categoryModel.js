const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("categorys", CategorySchema);
