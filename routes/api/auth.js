// Auth Routes

const express = require("express");
const passport = require("passport");
const router = express.Router();

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

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
      successRedirect: '/portfolio',
      failureRedirect: '/',
      failureFlash: true
  })(req, res, next)
})

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).redirect("/");
});

module.exports = router;
