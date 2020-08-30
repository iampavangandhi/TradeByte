// Auth Routes

//jshint esversion:8

const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureGuest } = require("../../middleware/auth");

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).redirect("/portfolio");
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).redirect("/");
});

module.exports = router;
