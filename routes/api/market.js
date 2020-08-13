// Market Routes

const express = require("express");
const router = express.Router();
const alpha = require("alphavantage")({ key: process.env.ALPHA_VANTAGE_KEY });

const jsonData = require("../../config/data-compact.json");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// TODO
// Implement Stocks Search
// https://www.alphavantage.co/documentation/#symbolsearch

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, async (req, res) => {
  res.status(200).render("market", { layout: "layouts/app", jsonData, href: '/market' });
});
  
module.exports = router;
