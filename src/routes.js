const { Router } = require('express');
const LoginController = require('./Controllers/LoginController');
const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController')
const FollowUpController = require('./Controllers/FollowUpController')
const SymptomsController = require('./Controllers/SymptomsController');

const routes = Router();


routes.post('/user', LoginController.LoginUser);
routes.post('/company',LoginController.LoginCompany);

routes.get('/users',UserController.GetUsers);
routes.post('/users',UserController.PostUsers);
routes.put('/users',UserController.PutUsers);

routes.get('/companies',CompanyController.GetCompany);
routes.post('/companies',CompanyController.PostCompany);
routes.put('/companies',CompanyController.PutCompany);

routes.get('/followup',FollowUpController.GetFollowUp);
routes.post('/followup',FollowUpController.PostFollowUp);

routes.get('/symptoms',SymptomsController.getSymptoms);

routes.get('/validToken',LoginController.validateToken)


module.exports = routes;