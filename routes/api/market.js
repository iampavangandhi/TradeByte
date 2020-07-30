// Market Routes

const express = require("express");
const router = express.Router();
const alpha = require("alphavantage")({ key: process.env.ALPHA_VANTAGE_KEY });

const getOverview = require("../../helpers/getOverview");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// TODO
// Implement Stocks Search
// https://www.alphavantage.co/documentation/#symbolsearch

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, async (req, res) => {
  res.status(200).render("market", { layout: "layouts/app" });
});

// @desc     Stocks Data
// @route    GET /Market/data/:Stock-Symbol
// @access   Private
router.get("/data/:symbol", (req, res) => {
  let symbol = req.params.symbol;
  alpha.data.quote(symbol).then((resp) => {
    res.status(200).send(resp);
  });
});

// @desc     Stock Description
// @route    GET /Market/desc/:Stock-Symbol
// @access   Private
router.get("/desc/:symbol", ensureAuth, async (req, res) => {
  let symbol = req.params.symbol;
  let data = await getOverview(symbol);
  res.status(200).send(data);
});

module.exports = router;
