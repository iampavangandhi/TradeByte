// Market Routes

const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const alpha = require("alphavantage")({ key: process.env.ALPHA_VANTAGE_KEY });
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    )
    .then((resp) =>
      res.status(200).json({
        Name: resp.data.Name,
        Sector: resp.data.Sector,
        MarketCap: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(resp.data.MarketCapitalization),
        PERatio: resp.data.PERatio,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).render("error/500");
    });
});

module.exports = router;
