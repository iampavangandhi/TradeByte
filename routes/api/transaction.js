// Cart Routes

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");
const User = require("../../models/User");

// @desc     To Buy Transaction Page
// @route    POST transaction/confirm
// @access   Private
router.put("/confirm", ensureAuth, async (req, res) => {
  try {
    let balance = req.user.balance - req.body.totalAmount;

    req.body.user = req.user.id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { balance: balance, $push: { stock: req.body } },
      {
        new: true, // it will create a new one, if it doesn't exist
        runValidators: true, // it check weather the fields are valid or not
      }
    );
    console.log(updatedUser);
    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
