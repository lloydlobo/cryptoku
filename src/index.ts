// https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/

const PORT = 8000;

// initialize
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const path = require("path");

const app = express();

const artists = [{}]; // maybe fetch the newspaper json from live-api rapid-api?

type Song = {
  title: string;
  url: string;
  source?: string;
  body?: string;
};
const songs: Song[] = [];
function writeJSONToFile() {
  const jsonContent = JSON.stringify(songs);

  fs.writeFile("output.json", jsonContent, "utf8", (err: any) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
    const time = new Date(new Date().getTime());
    console.log(`\n${time}\nFile written to output.json\n\n`);
  });
}

// #1 path
app.get("/", (req: any, res: any) => {
  res.json("Welcome to favorite lyrics API");
});

// #3 fetch lyrics from axios -> html scrape with cheerio
// and push it to the array articles
app.get("/lyrics", (req: any, res: any) => {
  const urls = [
    "https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/",
    "https://www.azlyrics.com/d/dylan.html",
    "https://www.theguardian.com/uk/money",
  ];

  // eslint-disable-next-line no-use-before-define
  axios.get(urls[0]).then((response: { data: any }) => {
    const html = response.data;
    console.log(html); // // go visit http://localhost:8000/lyrics -> html in the terminal

    const $ = cheerio.load(html);
    // can use regexp to input RegExp(/[a-zA-Z0-9]) in a:contains()
    // eslint-disable-next-line no-undef
    $('strong:contains("I")', html).each(function (this: cheerio.Element) {
      const title: string = $(this).text();
      const url: string = $(this).attr("href");
      const body: string = $(this).attr("p");

      songs.push({
        title: title,
        url: url,
      });
    });
    writeJSONToFile();
  });

  // res JSON displayed in localhost:${PORT}/lyrics
  res.json(songs);
});

// #2 listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

// parse json
// const jsonObj = JSON.parse([...songs].toString());

// stringify JSON object just parsed

// const writeTo = path.join(__dirname, "songs.json");
// https://www.tutorialkart.com/nodejs/node-js-write-json-object-to-file/
// const writeSync = fs.writeSync(writeTo);
