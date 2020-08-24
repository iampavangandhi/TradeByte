// search Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const totalData = require("../../config/data-total.json");

router.get("/", ensureAuth, (req, res) => {
  let avatar = req.user.image;

  res.status(200).render("search", {
    layout: "layouts/app",
    avatar,
    totalData,
    href: "/search",
  });
});

module.exports = router;
