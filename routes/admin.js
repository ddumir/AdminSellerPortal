const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/index(.html)?', function(req, res) {
    res.render("Admin/index.html");
});

router.get('/seller-application-pending(.html)?', function(req, res) {
    res.render("/Admin/seller-application-pending.html");
});

router.get('/seller-application-rejected(.html)?', function(req, res) {
    res.render("/Admin/seller-application-rejected.html");
});

router.get('/seller-list(.html)?', function(req, res) {
    res.render("/Admin/seller-list.html");
});

module.exports = router;