// Market Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Market page
// @route    GET /Market
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  res.status(200).render("market", { layout: "layouts/app" });
});

module.exports = router;
