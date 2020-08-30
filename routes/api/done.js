// Done Route

//jshint esversion:8

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");

// @desc     Done page
// @route    GET /done
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  const userId = req.user.id;
  const host = req.headers.host;
  res.status(200).render("done", { userId, host }); // pass userId for the share link generation
});

module.exports = router;
