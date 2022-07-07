"use strict";
var PORT = 8000;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();
var newspapers = [{}];
var articles = [];
app.get("/", function (req, res) {
    res.json("Welcome to favorite lyrics API");
});
app.get("/lyrics", function (req, res) {
    var urls = [
        "https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/",
        "https://www.azlyrics.com/d/dylan.html",
        "https://www.theguardian.com/uk/money",
    ];
    axios.get(urls[1]).then(function (response) {
        var html = response.data;
        console.log(html);
        var $ = cheerio.load(html);
        $('a:contains("i")', html).each(function () {
            var title = $(this).text();
            var url = $(this).attr("href");
            articles.push({
                title: title,
                url: url,
            });
        });
    });
    res.json(articles);
    console.log(articles);
});
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
});
