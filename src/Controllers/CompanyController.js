var CompanyModel = require('../Models/CompanyModel');
var Auth = require('../Utils/Auth');

var UserController = {

    async GetCompany(req,res) {

        try{

            const company = await CompanyModel.getCompany();
                
            if(company != null){
                return res.status(200).send({
                    'companyData': company,
                });
            }
            else{
                return res.status(200).send({
                    'message':'Não foram encontradas empresas!'
                });
            }
        }
        catch(err){
            return res.status(500).send({
                'error' : err
            });
        }
    },
    async PostCompany(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);

            if(auth.valid){
                await CompanyModel.postCompany(req,res);
                
            }
            else{
                return res.status(auth.status_code).send({
                    'message': auth.message
                });
            }

        }
        catch(err){
            return res.status(500).send({
                'error' : err
            });
        }
    },
    async PutCompany(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);

            if(auth.valid){
                await CompanyModel.putCompany(req,res);
                
            }
            else{
                return res.status(auth.status_code).send({
                    'message': auth.message
                });
            }

        }
        catch(err){
            return res.status(500).send({
                'error' : err
            });
        }
    }

};

module.exports = UserController;