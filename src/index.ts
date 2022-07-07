// https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/

const PORT = 8000;

// initialize
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers = [{}]; // maybe fetch the newspaper json from live-api rapid-api?

type Article = {
  title: string;
  url: string;
  source?: string;
};
const articles: Article[] = [];

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
  axios.get(urls[1]).then((response: { data: any }) => {
    const html = response.data;
    console.log(html); // // go visit http://localhost:8000/lyrics -> html in the terminal

    const $ = cheerio.load(html);
    // eslint-disable-next-line no-undef
    $('a:contains("i")', html).each(function (this: cheerio.Element) {
      const title: string = $(this).text();
      const url: string = $(this).attr("href");

      articles.push({
        title: title,
        url: url,
      });
    });
  });

  // res JSON displayed in localhost:${PORT}/lyrics
  res.json(articles);
  console.log(articles);
});

// #2 listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
