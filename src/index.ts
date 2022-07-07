console.log('Gloria In Excelsis Deo!');
// https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/

const PORT = 8000;
console.log(PORT);

// initialize
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const newspapers = [{}]; // maybe fetch the newspaper json from live-api rapid-api?

type Article = {
    title: string;
    url: string;
    source: string;
};
const articles: Article[] = [];

// #1 path
app.get('/', (req: any, res: { json: (arg0: string) => void }) => {
    res.json('Welcome to favorite lyrics API');
});

// #3 fetch lyrics from axios -> html scrape with cheerio
// and push it to the array articles
app.get('/lyrics', (req: any, res: any) => {
    const url = `https://www.billboard.com/music/rock/bob-dylan-beautiful-lyrics-nobel-prize-literature-7541798/`;

    // eslint-disable-next-line no-use-before-define
    axios.get(url).then(function (response: { data: any }) {
        const html = response.data;
        console.log(html); // // go visit http://localhost:8000/lyrics -> html of the url websites comes back to the terminal
    });
    // res JSON displayed in localhost:${PORT}/lyrics
    res.json(articles);
});

// #2 listen through nodemon - dist/index.js
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
