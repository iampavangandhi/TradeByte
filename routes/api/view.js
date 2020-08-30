// View Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();

const alpha = require("alphavantage")({
  key: process.env.ALPHA_VANTAGE_KEY,
});

const getPrice = require("../../helpers/getPrice");
const getOverview = require("../../helpers/getOverview");
const { ensureAuth } = require("../../middleware/auth");

// @desc     View Page
// @route    GET /view/:symbol
// @access   Private
router.get("/:symbol", ensureAuth, async (req, res) => {
  const symbol = req.params.symbol;
  let data = await getOverview(symbol);
  let { latestPrice, low, high } = await getPrice(symbol);
  let AssetType = data["AssetType"];
  let assetName = data["Name"];
  let assetExchange = data["Exchange"];
  let Currency = data["Currency"];
  let Country = data["Country"];
  let Sector = data["Sector"];
  let MarketCap = data["MarketCap"];
  let Ebitda = data["EBITDA"];
  let PERatio = data["PERatio"];
  let PriceToBookRatio = data["PriceToBookRatio"];
  let EPS = data["EPS"];
  let DividendYield = data["DividendYield"];
  let BookValue = data["BookValue"];
  let ProfitMargin = data["ProfitMargin"];
  let RevenueTTM = data["RevenueTTM"];
  let Desc = data["Desc"];
  let weeksLow = data["weeksLow"];
  let weeksHigh = data["weeksHigh"];

  alpha.data
    .intraday(symbol, "compact", "json", "60min")
    .then((data) => {
      const intraDay = data["Time Series (60min)"];

      let dates = [];
      let opening = [];
      let closing = [];
      let highs = [];
      let lows = [];
      let volumes = [];
      const keys = Object.getOwnPropertyNames(intraDay);

      for (let i = 0; i < 40; i++) {
        dates.push(keys[i]);
        opening.push(intraDay[keys[i]]["1. open"]);
        highs.push(intraDay[keys[i]]["2. high"]);
        lows.push(intraDay[keys[i]]["3. low"]);
        closing.push(intraDay[keys[i]]["4. close"]);
        volumes.push(intraDay[keys[i]]["5. volume"]);
      }

      // reverse so dates appear from left to right
      dates.reverse();
      closing.reverse();

      res.status(200).render("view", {
        layout: "layouts/app",
        href: "/market",
        avatar: req.user.image,
        symbol,
        data,
        dates,
        opening,
        closing,
        highs,
        lows,
        volumes,
        AssetType,
        assetName,
        assetExchange,
        Currency,
        Country,
        Sector,
        MarketCap,
        Ebitda,
        PERatio,
        PriceToBookRatio,
        EPS,
        DividendYield,
        BookValue,
        ProfitMargin,
        RevenueTTM,
        Desc,
        latestPrice,
        high,
        low,
        weeksLow,
        weeksHigh,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render("error/404");
    });
});

module.exports = router;
