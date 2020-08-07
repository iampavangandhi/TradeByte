// Stock Model
const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    stockPrice: {
        type: Float,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref = 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(Stock, StockSchema)