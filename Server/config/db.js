const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
mongoose.set('strictQuery', false);

exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Successfully connected to database !")
    } catch (error) {
        console.log("database connection failed.");
        console.log(error)
    }
}
