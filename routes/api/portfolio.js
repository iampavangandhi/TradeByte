// Portfolio Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const totalData = require("../../config/data-total.json");

// import User and Transaction models
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

// @desc     Portfolio page
// @route    GET /portfolio
// @access   Private
router.get("/", ensureAuth, async (req, res) => {
  let avatar = req.user.image;
  const user = req.user;
  // See if prevUser cookie exists and the new user have balance of 10000 (amount for the newly created account)
  if (req.cookies.prevUser !== "" && req.user.balance === 10000) {
    try {
      // Get the balance of the user who shared link
      const { balance: prevUserBalance } = await User.findOne({
        _id: req.cookies.prevUser,
      });

      // Update the balance of user who shared the share link
      await User.findOneAndUpdate(
        { _id: req.cookies.prevUser },
        { balance: prevUserBalance + 100 }, // updating existing balance
        {
          new: true, // it will create a new one, if it doesn't exist
          runValidators: true, // it check weather the fields are valid or not
        }
      );

      // Update the balance of user who used the share link
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { balance: req.user.balance + 50 },
        {
          new: true, // it will create a new one, if it doesn't exist
          runValidators: true, // it check weather the fields are valid or not
        }
      );

      // Adding new transaction details on Transaction Schema for user who signed up using the share link
      const transactionDetails =
        "50$ Balance Added to Wallet from the share link";
      const transactionOperation = "Debited";
      const transactionUser = req.user.id;
      await Transaction.create({
        details: transactionDetails,
        amount: 50,
        operation: transactionOperation,
        user: transactionUser,
      });

      // Adding new transaction details on Transaction Schema for the user who shared the link
      await Transaction.create({
        details: "100$ Balance Added to Wallet from the shared link",
        amount: 100,
        operation: transactionOperation,
        user: req.cookies.prevUser,
      });

      // set prevUser cookie to empty string after one user signed up using it
      res.cookie("prevUser", "");
    } catch (err) {
      console.error(err);
    }
  }

  // If a cookie exists but the user has balance more than 10000 which means he already have an account, set the cookie value to empty
  if (req.cookies.prevUser !== "" && req.user.balance !== 10000) {
    res.cookie("prevUser", "");
  }

  // Stock Message
  var StockMessage = "";
  stocks = user.stock;

  if (Object.keys(stocks).length == 0) {
    StockMessage = "No Stock";
  } else {
    StockMessage = "";
  }

  // Total Portfolio
  totalPortfolio = 0;

  stocks.forEach((stock) => {
    totalPortfolio = totalPortfolio + stock.totalAmount;
  });

  // Render
  res.render("portfolio", {
    StockMessage,
    totalPortfolio,
    user,
    avatar,
    totalData,
    layout: "layouts/app",
    href: "/portfolio",
  });
});

module.exports = router;
