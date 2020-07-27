const express = require("express");
const router = express.Router();

// @desc     Login/Landing page
// @route    GET /
// @access   Public
router.get("/", (req, res) => {
  res.status(200).render("login", { layout: "layouts/login" });
});

module.exports = router;
