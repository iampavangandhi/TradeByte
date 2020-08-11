// Add Balance Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     // Add Balance page
// @route    GET /
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  res.status(200).render("addBalance");
});

// TODO
router.post("/", ensureGuest, (req, res) => {
  console.log("added");
});

module.exports = router;
