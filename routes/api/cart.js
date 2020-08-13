// Cart Routes
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");

const User = require("../../models/User");
const getPrice = require("../../helpers/getPrice");

// TODO
// Stocks Cart Buy/Sell

// TODO
// Empty Cart Route

// @desc    To buy
// @route   GET /cart/:symbol
router.get("/:symbol", ensureAuth, async (req, res) => {
  const symbol = req.params.symbol;
  const price = await getPrice(symbol);
  res.status(200).render("cart", { layout: "layouts/app", symbol, price, href: '/market' });
});

// @desc    To buy
// @route   POST /cart/buy
router.post("/buy", ensureAuth, async (req, res) => {
  let data = req.body;
  let user = req.user;
  let companySymbol = req.body.companySymbol;
  let stockPrice = req.body.stockPrice;
  let noOfStock = req.body.noOfStock;
  let totalAmount = stockPrice * noOfStock;

  try {
    console.log(req.user);
    console.log(req.body);
    // req.body.user = req.user.id
    if (totalAmount > req.user.balance) {
      let ExtraBalance = totalAmount - req.user.balance;
      res.render("transaction", {
        ExtraBalance,
        message: "Insufficent Balance",
      });
    } else {
      res.render("transaction", {
        data,
        user,
        totalAmount,
        message: "Order Review",
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
