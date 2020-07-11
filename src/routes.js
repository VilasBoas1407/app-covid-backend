const { Router } = require('express');
const LoginController = require('./Controllers/LoginController');
const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController')
const FollowUpController = require('./Controllers/FollowUpController')

const routes = Router();


routes.get('/user', LoginController.LoginUser);
routes.get('/users',UserController.GetUsers);
routes.post('/users',UserController.PostUsers);
routes.put('/users',UserController.PutUsers);

//routes.get('/company',CompanyController.LoginCompany);
routes.get('/companies',CompanyController.GetCompany);
routes.post('/companies',CompanyController.PostCompany);
routes.get('/companies/:id',CompanyController.GetCompany);
routes.put('/companies/:id',CompanyController.PutCompany);

routes.get('/followup/:id',FollowUpController.GetFollowUp);
routes.post('/followup/:id',FollowUpController.PostFollowUp);



module.exports = routes;