const mongoose = require("mongoose");

let adminSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            require: true,
            trim: true
        },
        firstName:{
            type: String,
            require: true,
            trim: true
        },
        lastName:{
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            require: true,
            trim: true
        }, 
        type:{
            type:String,
            defaultvalue:"customer",
        }
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('admins', adminSchema);