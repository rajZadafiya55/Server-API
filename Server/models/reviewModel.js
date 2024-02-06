const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        user_id: {
            type: mongoose.Schema.Types.String,
            ref: "User",
          },
    }
)

module.exports = mongoose.model('reviews',ReviewSchema);