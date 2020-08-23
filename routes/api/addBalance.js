// Add Balance Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");
const User = require("../../models/User");

// @desc     // Add Balance page
// @route    GET /
// @access   Private
router.get("/", ensureAuth, (req, res) => {
    let user = req.user;
    let avatar = req.user.image;
    res
        .status(200).render("addBalance", {
            layout: "layouts/app",
            avatar,
            user,
            href: "/addBalance"
        });
});

// TODO
router.post("/", ensureAuth, async(req, res) => {
    // why ensureGuest here?
    let amount = Number(req.body.addAmount); // type cast amount to number as body parser take it as string
    let finalAmont = amount + req.user.balance;

    try {
        req.body.user = req.user.id;
        const updateBalance = await User.findOneAndUpdate({ _id: req.user.id }, { balance: finalAmont }, {
            new: true, // it will create a new one, if it doesn't exist
            runValidators: true, // it check weather the fields are valid or not
        });
        console.log(updateBalance);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

module.exports = router;