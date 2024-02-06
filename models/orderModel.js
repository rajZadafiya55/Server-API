const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.String,
            ref: "User",
        },
        item_id: {
            type: mongoose.Schema.Types.String,
            ref: "Menu",
        },
        username: {
            type: String,
            require: true,
        },
        table_no: {
            type: Number,
            require: true,
        },
        discount: {
            type: Number,
            require: true,
        },
        total_amt: {
            type: Number,
            require: true,
        },
        descreption: {
            type: String,
            require: true,
        },
        qty: {
            type: Array,
            require: true,
        },
        order_date: Date,
    }
)

module.exports = mongoose.model('orders', OrderSchema);