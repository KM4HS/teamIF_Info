const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

let client_id = "CU1BT73fz2GQOB80xey7";
let client_secret = "1qxxj76E2c";
let api_url = "https://openapi.naver.com/v1/search/news.json?query=it&display=6&start=1&sort=sim";

let options = {
  url: api_url,
  headers: {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret,
  },
};

app.use(cors());

app.get("/naver/search", async (req, res, next) => {
  request.get(options, (err, response, body) => {
    if (!err && res.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000);
console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
