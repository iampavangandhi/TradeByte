// var router = require('express').Router()
//     // var faker = require('faker')
// var jsonData = require("../../config/data-total.json")


// // adding pagination

// router.get('/:page', function(req, res, next) {
//     var perPage = 9
//     var page = req.params.page || 1

//     jsonData
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, products) {
//             jsonData.count().exec(function(err, count) {
//                 if (err) return next(err)
//                 res.render("market", {
//                     layout: "layouts/app",
//                     jsonData,
//                     href: "/market",
//                     products: products,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 })
//             })
//         })
// })

// module.exports = router