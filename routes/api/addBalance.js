// Add Balance Route
const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// @desc     Login/Landing page
// @route    GET /
// @access   Public
router.get("/", ensureGuest, (req, res) => {
    res.status(200).render("addaccount/add", {
        viewTitle: "Add Balance"
    });
});
router.post('/', ensureGuest, (req, res) => {
    console.log('added');
});

module.exports = router;