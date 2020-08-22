// Cart Routes
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");

const User = require("../../models/User");
const getPrice = require("../../helpers/getPrice");
const getCompanyNameAndLogo = require("../../helpers/getCompanyNameAndLogo");

// TODO
// Stocks Cart Buy/Sell

// TODO
// Empty Cart Route

// @desc    To buy
// @route   GET /cart/:symbol
router.get("/:symbol", ensureAuth, async (req, res) => {
  const symbol = req.params.symbol;
  const { latestPrice } = await getPrice(symbol);
  const { companyName, logoSrc } = await getCompanyNameAndLogo(symbol);
  res
    .status(200)
    .render("cart", {
      layout: "layouts/app",
      symbol,
      latestPrice,
      logoSrc,
      companyName,
      href: "/market",
      avatar: req.user.image,
    });
});

// @desc    To buy
// @route   POST /cart/buy
router.post("/buy", ensureAuth, async (req, res) => {
  let data = req.body;
  let user = req.user;
  let stockPrice = data.stockPrice;
  let noOfStock = data.noOfStock;
  let totalAmount = parseFloat(stockPrice * noOfStock).toFixed(4);

  try {
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
