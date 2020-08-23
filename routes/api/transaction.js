// Cart Routes

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");
const User = require("../../models/User");

// Import emailHelper helper function
const emailHelper = require("../../helpers/emailHelper");

// @desc     To Buy Transaction Page
// @route    POST transaction/confirm
// @access   Private
router.put("/confirm", ensureAuth, async (req, res) => {
  try {
    const totalPrice = req.body.totalAmount;
    let balance = req.user.balance - totalPrice;
    console.log(req.user.displayName + "this is the name");
    req.body.user = req.user.id;
    const { email, displayName } = req.user;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { balance: balance, $push: { stock: req.body } },
      {
        new: true, // it will create a new one, if it doesn't exist
        runValidators: true, // it check weather the fields are valid or not
      }
    );

    const options = {
      to: email, // list of receivers
      subject: "Hello from TradeByte✔", // Subject line
      html: `
      <b>Hello ${displayName}</b>
      <p>You bought stocks from TradeByte of amount ${totalPrice}, your remaining TradeByte balance is ${balance}</p>
      <p>This is a demo Project made by TradeByte team for educational purpose only.</p>
      <p>Have a great Day!</p>
    `, // html body
    };
    console.log(updatedUser);

    emailHelper.sendEmail(options);

    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
