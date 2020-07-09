const { Router } = require('express');
const LoginController = require('./Controllers/LoginController');
const UserController = require('./Controllers/UserController');

const routes = Router();


routes.get('/user', LoginController.LoginUser);
routes.get('/users',UserController.GetUsers);

module.exports = routes;