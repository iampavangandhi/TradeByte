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
  res.status(200).render("cart", {
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
  const user = req.user;
  const symbol = req.body.companySymbol;
  const { latestPrice } = await getPrice(symbol);
  const noOfStock = req.body.noOfStock;
  const totalAmount = parseFloat(latestPrice * noOfStock).toFixed(4);

  const data = {
    companySymbol: symbol,
    stockPrice: latestPrice,
    noOfStock: noOfStock,
    totalAmount: totalAmount,
  };

  console.log(data);

  try {
    if (totalAmount > req.user.balance) {
      let ExtraBalance = totalAmount - req.user.balance;
      res.render("transaction/transaction", {
        layout: "layouts/app",
        href: "/buy",
        ExtraBalance,
        message: "Insufficent Balance",
      });
    } else {
      res.render("transaction/transaction", {
        data,
        user,
        totalAmount,
        stockPrice,
        message: "Order Review",
        layout: "layouts/app",
        href: "/buy",
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
