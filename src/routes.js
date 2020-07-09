const { Router } = require('express');
const LoginController = require('./Controllers/LoginController');

const routes = Router();


routes.get('/user', LoginController.LoginUser);

module.exports = routes;