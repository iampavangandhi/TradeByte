// Portfolio Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Portfolio page
// @route    GET /portfolio
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  let avatar = req.user.image;
  res.status(200).render("portfolio", { layout: "layouts/app", avatar, href: '/portfolio' });
});

module.exports = router;
