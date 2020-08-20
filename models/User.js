// User Model (Google OAuth)

const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  balance: {
    type: Float,
    required: true,
  },
  stock: [
    {
      companySymbol: {
        type: String,
        required: true,
      },
      stockPrice: {
        type: Float,
        required: true,
      },
      noOfStock: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Float,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  favStock: [
    {
      companySymbol: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
