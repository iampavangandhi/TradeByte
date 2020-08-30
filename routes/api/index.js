// Index Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureGuest } = require("../../middleware/auth");

// @desc     Login/Landing page
// @route    GET /
// @access   Public
router.get("/", ensureGuest, (req, res) => {
  res.status(200).render("login", { layout: "layouts/login" });
});

// @desc     Login from Referral link
// @route    GET /share/:id (will be redirected to login page)
// @access   Public
router.get("/share/:id", ensureGuest, (req, res) => {
  let user1 = req.params.id;
  res.cookie("prevUser", user1, { expire: 36000 + Date.now() }).redirect("/");
});

module.exports = router;
