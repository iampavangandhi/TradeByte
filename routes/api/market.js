// Market Routes

const express = require("express");
const router = express.Router();
const alpha = require("alphavantage")({ key: process.env.ALPHA_VANTAGE_KEY });

var jsonData = [];
const jsonData1 = require("../../config/data-compact.json");
const jsonData2 = require("../../config/data-total.json");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const dataCnt1 = jsonData1.length;
const dataCnt2 = jsonData2.length;
const dataLast1 = dataCnt1 + 1;
const dataStart2 = dataCnt1 + 1;

jsonData.push({ data1: dataCnt1, data2: dataCnt2, dataLast1: dataLast1, dataStart2: dataStart2 })
for (var i = 0; i < dataCnt1; i++) {
    jsonData.push(jsonData1[i]);
};
for (var i = 0; i < dataCnt2; i++) {
    jsonData.push(jsonData2[i]);
};

// TODO
// Implement Stocks Search
// https://www.alphavantage.co/documentation/#symbolsearch

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, async(req, res) => {
    res
        .status(200)
        .render("market", { layout: "layouts/app", jsonData, href: "/market" });
});


module.exports = router;