// Index Route

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Login/Landing page
// @route    GET /
// @access   Public
router.get("/", ensureGuest, (req, res) => {
  res.status(200).render("login", { layout: "layouts/login" });
});

module.exports = router;
