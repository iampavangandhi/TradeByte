// Done Route

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Done page
// @route    GET /done
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  res.status(200).render("done");
});

module.exports = router;
