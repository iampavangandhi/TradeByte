// Edit Profile Route
//jshint esversion: 6

const express = require("express");
const router = express.Router();
const passport = require("passport");
const app = express();
//desc Shows edit page
//@route Get/profile/edit
const getdb = require("./../../config/db");
const {
    ensureAuth
} = require("../../middleware/auth");
const {
    mongo
} = require("mongoose");
const getOverview = require("../../helpers/getOverview");
const {
    route
} = require("./profile");
const User = require("../../models/User");

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

router.get("/edit", ensureAuth, (req, res) => {
    res.render("edit");
});

router.post('/edit', (req, res) => {
    const userId = req.user._id;
    console.log(userId);

    User.findByIdAndUpdate(userId,{
        displayName: req.body.userName,
        firstName : req.body.fname,
        lastName: req.body.Lname,

    } ,function(err, docs){
        if(err){
            console.log(err);
        }else{
            console.log("Updataed User", docs);
        }
    });

    console.log(req.body.fname);

});

module.exports = router;