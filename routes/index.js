const express = require("express");
const router = express.Router();

// @desc     Login/Landing page
// @route    GET /
// @access   Public
router.get("/", (req, res) => {
  res.send("Login/Landing Page");
});

module.exports = router;
