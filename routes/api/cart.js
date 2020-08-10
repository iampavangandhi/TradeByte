// Cart Routes
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')
const User = require('../../models/User')

// TODO
// Stocks Cart Buy/Sell


// @desc    To buy
// @route   GET /cart
router.get('/', ensureAuth, async (req, res) => {
    console.log(req.user)
    res.render('cart')
})


// @desc    To buy
// @route   POST /cart/buy
router.post('/buy', ensureAuth, async (req, res) => {
    let data = req.body
    let companySymbol = req.body.companySymbol
    let stockPrice = req.body.stockPrice
    let noOfStock = req.body.noOfStock
    let totalAmount = stockPrice * noOfStock

    try {
        console.log(`Symbol: ${companySymbol}, Total Amount: ${totalAmount}`)
        console.log(req.user)
        console.log(req.body)
        // req.body.user = req.user.id
        if (totalAmount > req.user.balance) {
            let ExtraBalance = totalAmount - req.user.balance
            res.render('transaction', {
                ExtraBalance,
                message: "Insufficent Balance",
            })
        } else {
            res.render('transaction', {
                data,
                totalAmount,
                message: "Order Review",
            })
        }
        
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router;