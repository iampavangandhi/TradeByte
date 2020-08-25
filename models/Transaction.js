// Adding / Spending Balance History

const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);

const TransactionSchema = new mongoose.Schema({
  details: {
    type: String,
    required: true,
  },
  amount: {
    type: Float,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
