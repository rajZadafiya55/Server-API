const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      trim:true
    },
    phone: {
      type: Number,
      required: true,
      match: /^\d{10}$/, 
      trim:true
    },
    expirationDate: {
      type: String,
      required: true,
      trim:true
    },
    cvv: {
      type: String,
      required: true,
      trim:true
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 1 && value <= 10000,
        message: "Amount must be between 1 and 10,000",
      },
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('payments',paymentSchema);