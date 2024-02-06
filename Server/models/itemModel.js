const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        imagename: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('items',ItemSchema);