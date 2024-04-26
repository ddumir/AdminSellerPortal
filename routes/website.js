const express = require('express');
const path = require('path');
const router = express.Router();


// Define a route to serve your HTML file Seller Portal
router.get('/', function(req, res) {
    res.render("Savvyo_web/home.html");
});

router.get('/seller(.html)?', function(req, res) {
    res.render("Savvyo_web/seller.html");
});

router.get('/seller_registration(.html)?', function(req, res) {
    res.render("Savvyo_web/seller_registration.html");
});

module.exports = router;