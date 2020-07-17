const express = require('express');
const app = express();         
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

const routes = require('./routes');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//Adicionando cors para permitir requisições externas
app.use(cors());

app.use(routes);

//inicia o servidor
app.listen(port);

