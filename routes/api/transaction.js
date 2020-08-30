// Cart Routes

const express = require("express");
const router = express.Router();
const {
  ensureAuth
} = require("../../middleware/auth");
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
    const stockCount = Number(req.body.noOfStock)
    const totalPrice = Number(req.body.totalAmount);
    let balance = Number(req.user.balance) - totalPrice;
    console.log(req.user.displayName + " this is the name");
    req.body.user = req.user.id;
    const {
      email,
      displayName
    } = req.user;

    // console.log(stockCount)

    // const updatedUser = await User.updateOne(
    //   { _id: req.user.id, stock: { $elemMatch: {companySymbol: req.body.companySymbol } } },
    //   { balance: balance,
    //     $inc: {"stock.$.noOfStock": stockCount},
    //     $inc: {"stock.$.totalAmount": totalPrice},
    //   }
    // );
    // console.log(`${updatedUser} : U P D A T E D U S E R`);
      
    const addedNewUser = await User.findOneAndUpdate(
    { _id: req.user.id }, 
    { balance: balance,
      $push: {
        stock: req.body
      }
    }, 
    {
      new: true, // it will create a new one, if it doesn't exist
      runValidators: true, // it check weather the fields are valid or not
    });
    console.log(addedNewUser);
    

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
    emailHelper.sendEmail(options);

    // Add data transaction
    // Adding new transaction details on Transaction Schema.
    const transactionDetails = `Added ${req.body.noOfStock} ${req.body.companySymbol} stock`;
    const transactionOperation = "Debited";
    const transactionUser = req.user.id;
    const transactionAmount = Number(req.body.totalAmount);

    const updateTransactoin = await Transaction.create({
      details: transactionDetails,
      amount: transactionAmount,
      operation: transactionOperation,
      user: transactionUser,
    });

    console.log(updateTransactoin);

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
        user: req.user.id
      })
      .populate("user")
      .sort({
        createdAt: -1
      })
      .lean();
    
    if(Object.keys(transactions).length == 0) {
      var message = 'No Transaction'
      res.render("transaction/history", {
        message,
        transactions,
        user,
        layout: "layouts/app",
        href: "/transaction",
      });
    } else {
      var message = ''
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
        const updateTransaction = await Transaction.create({
          details: transactionDetails,
          amount: totalAmount,
          operation: transactionOperation,
          user: transactionUser,
        });

        // Update the User Balance and Deleted the Sold Stock
        const updatedBalance = await User.findOneAndUpdate({
          _id: req.user.id
        }, {
          balance: newBalance,
          $pull: {
            stock: {
              _id: req.params.id
            }
          }
        });

        console.log(updatedBalance);
        console.log(updateTransaction);
        console.log(newBalance);
      }
    });

    res.redirect("/done");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;