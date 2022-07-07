// cspell:ignore Marketcap cryptocurrent
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
const coinsArray: any[] = [];

interface Keys {
  Rank: string;
  Coin: string;
  Price: string;
  Hours_24: string;
  Days_7: string;
  Marketcap: string;
  Volume: string;
  CirculatingSupply: string;
}

// #1 path
app.get("/", (req: any, res: any) => {
  res.json("Welcome to cryptocurrent API");
});

const scrapeCryptoPrice = async () => {
  const url = "https://coinmarketcap.com/";
  axios(url)
    .then((response: { data: any }) => {
      const htmlMarkup = response.data;
      const $ = cheerio.load(htmlMarkup);

      const selectedElem = `#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr`;
      const keys: any[] = [ "Rank", "Coin", "Price", "Hours_24", "Days_7", "Marketcap", "Volume", "CirculatingSupply", ]; // prettier-ignore

      $(selectedElem).each((indexParent: number, elemParent: any) => {
        let keyIdx = 0;
        const coinsData = Object(null);

        if (indexParent <= 9) {
          $(elemParent)
            .children()
            .each((idChild: any, elemChild: any) => {
              const data = $(elemChild).text();
              if (data) {
                coinsData[keys[keyIdx]] = data;
                keyIdx += 1;
              }
            });
          coinsArray.push(coinsData);
        }
      });
    })
    .catch((err: any) => console.error(err));

  return coinsArray;
};

// #3 return result try/catch
const data = app.get("/crypto", async (req: any, res: any) => {
  const data = async () => {
    try {
      const crypto = await scrapeCryptoPrice();
      return res.status(200).json({
        result: crypto,
      });
    } catch (err: any) {
      return res.status(500).json({
        err: err.toString(),
      });
    }
  };
  return data();
});

// #2 listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

// //////////////////////////////////////////////////////////////////s

// #1 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor#description

/* #2

  Cheerio provides methods like find() to find elements, each() to iterate through elements, filter() method amongst others.

  #1 Copy Selector
      __next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr:nth-child(1)
      
*/

// //////////////////////////////////////////////////////////////////s

async function writeJSONToFile(array: any[]) {
  const jsonContent = JSON.stringify(array);
  await fs.writeFile("output.json", jsonContent, "utf8", (err: any) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
    const time = new Date(new Date().getTime());
    console.log(`\n${time}\nFile written to output.json\n\n`);
  });
}

// writeJSONToFile(data);
