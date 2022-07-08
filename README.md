# API

This API fetches the latest cryptocurrency pricing by market cap. Get rankings, and details of 24/7 & 7 days among other data.

[Test it Live!](https://rapidapi.com/lloydlobo/api/crypto-derby)
[![image](https://user-images.githubusercontent.com/76430758/177787239-62788c3c-e968-450c-b5bd-6f51b1a24e98.png)](https://rapidapi.com/lloydlobo/api/crypto-derby)

## Knowledge

- Before scraping a website verify if it grants permission for scraping.
- If it does, check what kind of actions are permitted.
- **TIP** Suffix a `robots.txt` text to the URL, to check the permissions.
  - For Example, `https.google.com/robots.txt`
  - [Credits](https://www.section.io/engineering-education/build-a-web-scraper-using-cheerio/)

## Additional Resources

### Development

#### SWC

Speedy Web Compiler - Written in Rust for JavaScript/Typescript.

#### Jest - Testing

> To make your Jest tests run faster, you can swap out the default JavaScript-based runner (ts-jest) for a drop-in Rust replacement using SWC.
> > [SWC](https://swc.rs/docs/usage/jest)

#### Cheerio

- [Source](https://zetcode.com/javascript/cheerio/)
  - `$("*")` — selects all elements
  - `$("#first")` — selects the element with `id="first"`
  - `$(".intro")` — selects all elements with `class="intro"`
  - `$("div")` — selects all `<div>` elements
  - `$("h2, div, p")` — selects all `<h2>`, `<div>`, `<p>` elements
  - `$("li:first")` — selects the first `<li>` element
  - `$("li:last")` — selects the last `<li>` element
  - `$("li:even")` — selects all even `<li>` elements
  - `$("li:odd")` — selects all odd `<li>` elements
  - `$(":empty")` — selects all elements that are empty
  - `$(":focus")` — selects the element that currently has focus

### Articles

- [NodeJs & Cheerio - FreeCodeCamp](https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/)
- [Cheerio - ZetCode](https://zetcode.com/javascript/cheerio/)

## Credits

- [Muhammed Umar](https://www.section.io/engineering-education/build-a-web-scraper-using-cheerio/)
