const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const game = require("./game");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // json de entrada no body

const rules = {
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(rules));

const server = http.createServer(app);

/*
  LÓGICA DE REQUISIÇÕES
*/

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get("/questions", function (req, res) {
  const position = Math.floor(Math.random() * 10); //numero aleatório entre 0 e 9

  res.status(200).send({
    id: game[position].id,
    questions: game[position].questions
  });
});

app.get("/questions/:id", function (req, res) {
  if (req.params.id > 9) return res.status(400).send("ID inválida");

  res.status(200).send({
    id: game[req.params.id].id,
    questions: game[req.params.id].questions
  });
});

app.post("/correction/:id", function (req, res) {
  if (req.params.id > 9) return res.status(400).send("ID inválida");

  let acertos = 0;
  const { respostas } = req.body;

  for (let i = 0; i < 10; i++) {
    if (respostas[i] === game[req.params.id].gabarito[i]) acertos++;
  }

  res.status(200).send({ acertos });
});

/* 
  LIGANDO O SERVER

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}!`));

*/
