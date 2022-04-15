const express = require("express");
const req = require("express/lib/request");
const tokendata = require("./data");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/tokendata", (req, res) => {
  res.status(200).json(tokendata);
});

app.get("/api/tokendata/:id", (req, res) => {
  const article = tokendata.find((e) => e.id === Number(req.params.id));
  res.status(200).json(tokendata);
});

app.post("/api/tokendata", (req, res) => {
  // Destructuring
  const { tokenName, symbol, chainNetwork } = req.body;

  // Dapatkan ID dari item terakhir
  const lastId = tokendata[tokendata.length - 1].id;
  const newId = lastId + 1;

  const article = {
    id: newId,
    tokenName,
    symbol,
    chainNetwork,
  };

  tokendata.push(article);

  res.status(201).json(article);
});

app.put("/api/tokendata/:id", (req, res) => {
  //Destructuring
  const { title, body } = req.body;

  const indexArticle = tokendata.findIndex((e) => e.id === Number(req.params.id));

  tokendata[indexArticle] = {
    id: Number(req.params.id),
    title: title,
    body: body,
  };

  res.status(200).json(tokendata[indexArticle]);
});

app.delete("/api/tokendata/:id", (req, res) => {
  const indexArticle = tokendata.findIndex((e) => e.id === Number(req.params.id));

  tokendata.splice(indexArticle, 1);

  res.status(200).json({
    message: `Article with ID ${req.params.id} is deleted`,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
