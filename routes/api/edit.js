// Edit Profile Route
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')

const User = require('../../models/User.js');
const { id } = require('date-fns/locale');
const { last } = require('lodash');



// @desc    Show edit page
// @route   GET /edit/:id
router.get("/", ensureAuth, (req, res) => {
    let avatar = req.user.image;

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    let email = req.user.email;


    console.log(avatar);


    res.status(200).render("edit", {
        layout: "layouts/app",
        avatar,
        firstName,
        lastName,
        email,
        href: "/edit",
    });
});

router.put("/", ensureAuth, async(req, res) => {
    try {


        let curruser1 = await User.findById(req.user._id).lean();
        console.log(curruser1);

        curruser1.firstName = req.body.firstName;
        curruser1.lastName = req.body.lastName;
        curruser1.email = req.body.email;
        curruser1.displayName = curruser1.firstName + " " + curruser1.lastName

        curruser1 = await User.findOneAndUpdate({ _id: curruser1._id }, {
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