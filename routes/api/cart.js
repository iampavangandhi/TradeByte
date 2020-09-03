// Cart Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");

const User = require("../../models/User");
const getPrice = require("../../helpers/getPrice");
const getCompanyNameAndLogo = require("../../helpers/getCompanyNameAndLogo");

// @desc     Cart Page
// @route    GET /cart/:symbol
// @access   Private
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

module.exports = router;
