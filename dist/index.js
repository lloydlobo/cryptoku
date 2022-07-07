"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var pretty = require("pretty");
var fs = require("fs");
var path = require("path");
var PORT = process.env.PORT || 8000;
var app = express();
var coinsArray = [];
app.get("/", function (req, res) {
    res.json("Welcome to cryptocurrent API");
});
var scrapeCryptoPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        url = "https://coinmarketcap.com/";
        axios(url)
            .then(function (response) {
            var htmlMarkup = response.data;
            var $ = cheerio.load(htmlMarkup);
            var selectedElem = "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr";
            var keys = ["Rank", "Coin", "Price", "Hours_24", "Days_7", "Marketcap", "Volume", "CirculatingSupply",];
            $(selectedElem).each(function (indexParent, elemParent) {
                var keyIdx = 0;
                var coinsData = Object(null);
                if (indexParent <= 9) {
                    $(elemParent)
                        .children()
                        .each(function (idChild, elemChild) {
                        var data = $(elemChild).text();
                        if (data) {
                            coinsData[keys[keyIdx]] = data;
                            keyIdx += 1;
                        }
                    });
                    coinsArray.push(coinsData);
                }
            });
        })
            .catch(function (err) { return console.error(err); });
        return [2, coinsArray];
    });
}); };
var data = app.get("/crypto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = function () { return __awaiter(void 0, void 0, void 0, function () {
            var crypto_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, scrapeCryptoPrice()];
                    case 1:
                        crypto_1 = _a.sent();
                        return [2, res.status(200).json({
                                result: crypto_1,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, res.status(500).json({
                                err: err_1.toString(),
                            })];
                    case 3: return [2];
                }
            });
        }); };
        return [2, data()];
    });
}); });
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
});
function writeJSONToFile(array) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonContent = JSON.stringify(array);
                    return [4, fs.writeFile("output.json", jsonContent, "utf8", function (err) {
                            if (err) {
                                console.error(err);
                                throw new Error(err);
                            }
                            var time = new Date(new Date().getTime());
                            console.log("\n".concat(time, "\nFile written to output.json\n\n"));
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
