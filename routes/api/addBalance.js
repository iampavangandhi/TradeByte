// Add Balance Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SK_TEST);

const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

// @desc     Add Balance
// @route    GET /addBalance
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  let user = req.user;
  let avatar = req.user.image;
  res.status(200).render("addBalance", {
    layout: "layouts/app",
    avatar,
    user,
    publishableKey: process.env.PK_TEST,
    href: "/addBalance",
  });
});

// @desc     Add Balance
// @route    POST /addBalance
// @access   Private
router.post("/", ensureAuth, async (req, res) => {
  let amount = Number(req.body.addAmount); // type cast amount to number as body parser take it as string

  let finalAmount = amount + req.user.balance;

  const { stripeToken } = req.body;

  try {
    // Stripe Payment
    await stripe.charges.create(
      {
        amount: req.user.balance * 100,
        currency: "usd",
        source: stripeToken,
        description: req.user.email,
      },
      (err) => {
        if (err && err.type === "StripeCardError") {
          return res.render("error/500");
        } else {
          console.log("Payment Success");
        }
      }
    );

    // Updating balance to user's schema.
    req.body.user = req.user.id;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { balance: finalAmount },
      {
        new: true, // it will create a new one, if it doesn't exist
        runValidators: true, // it check weather the fields are valid or not
      }
    );

    // Adding new transaction details on Transaction Schema.
    const transactionDetails = "Balance Added to Wallet";
    const transactionOperation = "Deposit";
    const transactionUser = req.user.id;
    await Transaction.create({
      details: transactionDetails,
      amount: amount,
      operation: transactionOperation,
      user: transactionUser,
    });

    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
