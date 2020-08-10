// Cart Routes
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')
const User = require('../../models/User')


// @desc    To buy
// @route   POST transaction/confirm
router.put('/confirm', ensureAuth, async (req, res) => {
    try {
        balance = req.user.balance - req.body.totalAmount

        req.body.user = req.user.id
        // Deducting Amount and updating it
        await User.findOneAndUpdate({_id : req.user.id}, {balance: balance})
        
        // Stock is not appended, it overwirtes on previous one
        await User.findOneAndUpdate( {_id: req.user.id}, {stock: req.body}, {
            new: true,                                  // it will create a new one, if it doesn't exist
            runValidators: true                         // it check weather the fields are valid or not
        })
        console.log(req.user.stock)
        res.redirect('../cart')
        
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router;