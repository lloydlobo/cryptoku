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
app.get('/lyrics', function (req, res) {
    var url = "https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/";
    axios.get(url).then(function (response) {
        var html = response.data;
        console.log(html);
    });
    res.json(articles);
});
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
});
