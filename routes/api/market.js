// Market Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const compactData = require("../../config/data-compact.json");
const totalData = require("../../config/data-total.json");

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, async (req, res) => {
  let min = 0;
  let max = 50;

  res.status(200).render("market", {
    layout: "layouts/app",
    compactData,
    totalData,
    min,
    max,
    href: "/market",
    avatar: req.user.image,
  });
});

// @desc     Market page
// @route    GET /Market/:page
// @access   Private
router.get("/:page", ensureAuth, async (req, res) => {
  let page = req.params.page - 1;
  let min = page * 50;
  let max = page * 50 + 50;

  if (page <= 0 || page >= 10) {
    res.status(200).redirect("/market");
  } else {
    res.status(200).render("market", {
      layout: "layouts/app",
      compactData,
      totalData,
      min,
      max,
      href: "/market",
      avatar: req.user.image,
    });
  }
});

module.exports = router;
