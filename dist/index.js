"use strict";
var PORT = 8000;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var fs = require("fs");
var path = require("path");
var app = express();
var artists = [{}];
var songs = [];
function writeJSONToFile() {
    var jsonContent = JSON.stringify(songs);
    fs.writeFile("output.json", jsonContent, "utf8", function (err) {
        if (err) {
            console.error(err);
            throw new Error(err);
        }
        var time = new Date(new Date().getTime());
        console.log("\n".concat(time, "\nFile written to output.json\n\n"));
    });
}
app.get("/", function (req, res) {
    res.json("Welcome to favorite lyrics API");
});
app
    .get("/lyrics", function (req, res) {
    var urls = [
        "https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/",
        "https://www.azlyrics.com/d/dylan.html",
        "https://www.theguardian.com/uk/money",
    ];
    axios.get(urls[0]).then(function (response) {
        var html = response.data;
        console.log(html);
        var $ = cheerio.load(html);
        $('strong:contains("i")', html).each(function () {
            var title = $(this).text();
            var url = $(this).attr("href");
            songs.push({
                title: title,
                url: url,
            });
        });
        writeJSONToFile();
    });
    res.json(songs);
})
    .catch(function (err) { return console.error(err); });
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
});
