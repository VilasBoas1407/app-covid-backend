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
            
            const companyData = req.body.companyData;


            const validEmail = await CompanyModel.validEmail(companyData.ds_email);
            
            if(!validEmail){
                
                var company = await CompanyModel.postCompany(companyData);
                if(company){
                    return res.status(200).send({
                        'valid':true,
                        'message': 'Empresa cadastrada com sucesso!'
                    });
                }
                else{
                    return res.status(500).send({
                        'valid' : false,
                        'message' : 'Ocorreu um erro ao cadastrar a empresa!'
                    });
                }
            }
            else{
                return res.status(200).send({
                    'valid' : false,
                    'message' : 'E-mail já cadastrado!'
                })
            }

        }
        catch(err){
            return res.status(500).send({
                'valid' : false,
                'message' : 'Ocorreu um erro interno!' + err
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