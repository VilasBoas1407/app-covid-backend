var CompanyModel = require('../Models/CompanyModel');
var Auth = require('../Utils/Auth');
const { PutCompany, getCompany } = require('../Models/CompanyModel');

var UserController = {

    async GetCompany(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);

            if(auth.valid){
                const user = await CompanyModel.getCompany();
                
                if(user != null){
                      return res.status(200).send({
                        'userData': user,
                        });
                }
                else{
                    return res.status(200).send({
                        'message':'Não foram encontrados usuários!'
                    });
                }
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