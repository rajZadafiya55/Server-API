const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim:true
        },
        email: {
            type: String,
            require: true,
            trim:true
        },
        message: {
            type: String,
            require: true,
          },
    }
)

module.exports = mongoose.model('contacts',ContactSchema);