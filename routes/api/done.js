// Done Route

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Done page
// @route    GET /done
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  const userId = req.user.id;
  res.status(200).render("done", { userId }); // pass userId for the share link generation
});

module.exports = router;
