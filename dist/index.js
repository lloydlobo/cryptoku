"use strict";
console.log('Gloria In Excelsis Deo!');
var PORT = 8000;
console.log(PORT);
var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');
var app = express();
var newspapers = [{}];
var articles = [];
app.get('/', function (req, res) {
    res.json('Welcome to favorite lyrics API');
});
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
});
