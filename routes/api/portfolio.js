// Portfolio Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const totalData = require("../../config/data-total.json");

// @desc     Portfolio page
// @route    GET /portfolio
// @access   Private
router.get("/", ensureAuth, (req, res) => {
    let user = req.user;
    let avatar = req.user.image;
    res
        .status(200)
        .render("portfolio", { layout: "layouts/app", avatar, totalData, href: "/portfolio" });
});

module.exports = router;