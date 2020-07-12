const { Router } = require('express');
const LoginController = require('./Controllers/LoginController');
const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController')
const FollowUpController = require('./Controllers/FollowUpController')

const routes = Router();


routes.post('/user', LoginController.LoginUser);
routes.get('/company',LoginController.LoginCompany);

routes.get('/users',UserController.GetUsers);
routes.post('/users',UserController.PostUsers);
routes.put('/users',UserController.PutUsers);

routes.get('/companies',CompanyController.GetCompany);
routes.post('/companies',CompanyController.PostCompany);
routes.put('/companies',CompanyController.PutCompany);

routes.get('/followup',FollowUpController.GetFollowUp);
routes.post('/followup',FollowUpController.PostFollowUp);



module.exports = routes;