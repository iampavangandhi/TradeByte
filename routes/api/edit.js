// Edit Profile Route
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')

const User = require('../../models/User.js');
const { id } = require('date-fns/locale');
const { last } = require('lodash');



// @desc    Show edit page
// @route   GET /edit/:id
router.get("/:id", ensureAuth, (req, res) => {
    let avatar = req.user.image;
    let curruser = req.user;
    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    let email = req.user.email;
    let googleId = req.user.googleId;
    let _id = req.user._id;

    console.log(avatar);


    res.status(200).render("edit", {
        layout: "layouts/app",
        avatar,
        firstName,
        lastName,
        email,
        googleId,
        _id,
        href: "/edit",
    });
});

router.put("/:id", ensureAuth, async(req, res) => {
    try {

        let curruser1 = await User.findById(req.params.id).lean();

        curruser1.firstName = req.body.firstName;
        curruser1.lastName = req.body.lastName;
        curruser1.email = req.body.email;
        curruser1.displayName = curruser1.firstName + " " + curruser1.lastName

        console.log(curruser1.firstName + "this is the first name");
        console.log(curruser1.lastName + "this is the last name");
        console.log(curruser1.displayName + "this is the disply name");
        console.log(curruser1.email + "this is the email");
        curruser1 = await User.findOneAndUpdate({ _id: req.params.id }, {
            firstName: curruser1.firstName,
            lastName: curruser1.lastName,
            email: curruser1.email,
            displayName: curruser1.displayName,
        }, {
            new: true, // it will create a new one, if it doesn't exist
            runValidators: true, // it check weather the fields are valid or not
        });
        res.redirect("/portfolio");
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
});

module.exports = router;