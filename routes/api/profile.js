//jshint esversion: 6

const express = require("express");
const router = express.Router();

const getdb = require("./../../config/db");
const {
    ensureAuth
} = require("../../middleware/auth");
const userModel = require("../../models/User");

router.get("/", ensureAuth, (req, res) => {
    // console.log(req.user._id);

    res
        .status(200)
        .render("profile", {
            userName: req.user.displayName,
            firstName: req.user.firstName,
            LastName: req.user.lastName,
            Balance: req.user.balance,
            userImage: req.user.image,
            layout: "layouts/app",
            href: "/profile"
        });
});


module.exports = router;