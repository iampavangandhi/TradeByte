// Cart Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const getPrice = require("../../helpers/getPrice");

// Import emailHelper helper function
const emailHelper = require("../../helpers/emailHelper");

// @desc     To Buy Transaction Page
// @route    POST transaction/confirm
// @access   Private
router.put("/confirm", ensureAuth, async (req, res) => {
  try {
    const companySymbol = req.body.companySymbol;
    const stockCount = Number(req.body.noOfStock);
    const totalPrice = Number(req.body.totalAmount);
    let balance = Number(req.user.balance) - totalPrice;
    req.body.user = req.user.id;
    const { email, displayName } = req.user;

    // Creating Body
    let body = {
      companySymbol: req.body.companySymbol,
      stockPrice: Number(req.body.stockPrice),
      noOfStock: Number(req.body.noOfStock),
      totalAmount: Number(req.body.totalAmount),
    };

    // Finding if the stock already Exist
    let stockArr = req.user.stock.find(
      (obj) => obj.companySymbol === companySymbol
    );

    // If stock exits and update body
    if (stockArr != null) {
      body = {
        companySymbol: req.body.companySymbol,
        stockPrice: Number(req.body.stockPrice),
        noOfStock: stockArr.noOfStock + stockCount,
        totalAmount: stockArr.totalAmount + totalPrice,
      };
    }

    // Pull the stock if already exist
    await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          stock: { companySymbol: companySymbol },
        },
      },
      { safe: true }
    );

    // Push Stock with the body or update body in case of pull
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        balance: balance,
        $push: {
          stock: body,
        },
      },
      {
        new: true, // it will create a new one, if it doesn't exist
        runValidators: true, // it check weather the fields are valid or not
      }
    );

    // Email Message
    let msg = "";

    if (stockCount == 1) {
      msg = "stock";
    } else {
      msg = "stocks";
    }

    // Email Object
    const options = {
      to: email, // list of receivers
      subject: "Hello from TradeByte ✔", // Subject line
      html: `
        <b>Hello ${displayName},</b>
        <p>You bought ${stockCount} ${msg} of ${companySymbol} from TradeByte of amount ${totalPrice.toFixed(
        2
      )}, your remaining TradeByte balance is ${balance.toFixed(2)}</p>
        <p>This is a Demo Project made by TradeByte team for educational purpose only.</p>
        <p>You can check the <a href="https://github.com/iampavangandhi/TradeByte">Github Repo</a> for details.</p>
        <p>Have a great Day!</p>
      `, // html body
    };
    emailHelper.sendEmail(options);

    // Add data transaction
    // Adding new transaction details on Transaction Schema.
    const transactionDetails = `Added ${req.body.noOfStock} ${req.body.companySymbol} stock`;
    const transactionOperation = "Debited";
    const transactionUser = req.user.id;
    const transactionAmount = Number(req.body.totalAmount);

    // Create Transaction
    await Transaction.create({
      details: transactionDetails,
      amount: transactionAmount,
      operation: transactionOperation,
      user: transactionUser,
    });

    // Done
    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc     To View Transaction History
// @route    POST /transaction
// @access   Private
router.get("/", ensureAuth, async (req, res) => {
  const user = req.user;
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    })
      .populate("user")
      .sort({
        createdAt: -1,
      })
      .lean();

    if (Object.keys(transactions).length == 0) {
      var message = "No Transaction";
      res.render("transaction/history", {
        message,
        transactions,
        user,
        layout: "layouts/app",
        href: "/transaction",
      });
    } else {
      var message = "";
      res.render("transaction/history", {
        message,
        transactions,
        user,
        layout: "layouts/app",
        href: "/transaction",
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc     To Sell Stock
// @route    POST /transaction/sell
// @access   Private
router.post("/sell/:id", ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // get number of stocks and amount of stock
    user.stock.forEach(async (stock) => {
      if (stock._id == req.params.id) {
        // Adding new transaction details on Transaction Schema.
        const transactionDetails = `Sold ${stock.noOfStock} stock of ${stock.companySymbol}`;
        const transactionOperation = "Credit";
        const transactionUser = req.user.id;

        // update balance get real time update
        const { high } = await getPrice(stock.companySymbol);
        const totalAmount = high * stock.noOfStock;
        const newBalance = req.user.balance + totalAmount;

        // Added to Transaction
        await Transaction.create({
          details: transactionDetails,
          amount: totalAmount,
          operation: transactionOperation,
          user: transactionUser,
        });

        // Update the User Balance and Deleted the Sold Stock
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },
          {
            balance: newBalance,
            $pull: {
              stock: {
                _id: req.params.id,
              },
            },
          }
        );
      }
    });

    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
