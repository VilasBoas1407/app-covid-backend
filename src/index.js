const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

const routes = require('./routes');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(routes);

//inicia o servidor
app.listen(port);
