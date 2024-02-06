const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  table: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("tables", TableSchema);
