// Edit Profile Route
// Edit Profile Route
//jshint esversion: 6

const express = require("express");
const router = express.Router();
const passport = require("passport");

//desc Shows edit page
//@route Get/profile/edit
const getdb = require("./../../config/db");
const {ensureAuth} = require("../../middleware/auth");
const { mongo } = require("mongoose");
const getOverview = require("../../helpers/getOverview");
const { route } = require("./profile");
const User = require("../../models/User");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", ensureAuth, (req, res) => {
    res.render("edit");
});

router.post('/edit', (req, res) => {
    console.log(req.body);
});

module.exports = router;