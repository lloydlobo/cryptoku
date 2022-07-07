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

const articles: {
    title: string;
    url: string;
    source: string;
}[] = [];

// path
app.get('/', (req: any, res: { json: (arg0: string) => void }) => {
    res.json('Welcome to favorite lyrics API');
});

// listen through nodemon - dist/index.js
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
