// Portfolio Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Portfolio page
// @route    GET /portfolio
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  let user = req.user;
  console.log(user)
  res
    .status(200)
    .render("portfolio", { layout: "layouts/app", user, href: "/portfolio" });
});

module.exports = router;
