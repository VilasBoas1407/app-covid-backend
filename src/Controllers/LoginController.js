var LoginModel = require('../Models/LoginModel');
var Auth = require('../Utils/Auth');
var Util = require('../Utils/Validators');

var LoginController = {

    async LoginUser(req,res) {
        
        try{
            const {ds_email, ds_senha } = req.body;

            if(Util.hasValue(ds_email) && Util.hasValue(ds_senha)){

                const user = await LoginModel.loginUser(ds_email,ds_senha);
           
                if(user != null){
                    var token = await  Auth.generateToken(user.id_usuario)
    
                      return res.status(200).send({
                        'userData': user,
                        'auth': true,
                        'token' : token
                        });
                }
                   
                else{
                    return res.status(200).send({
                        'message':'E-mail ou senha inválido!'
                    });
                }
            }
            else{
                return res.status(204).send({
                    'message' : 'Favor informar e-mail ou senha!'
                });
            }

        }
        catch(err){
            return res.status(500).send({
                'error' : err
            });
        }
    },
    async LoginCompany(req,res) {
        
        try{
            const {ds_email, ds_senha } = req.body;

            const user = await LoginModel.loginCompany(ds_email,ds_senha);
           
            if(user != null){
                var token = await  Auth.generateToken(user.id_usuario)

                  return res.status(200).send({
                    'userData': user,
                    'auth': true,
                    'token' : token
                    });
            }
               
            else{
                return res.status(200).send({
                    'message':'E-mail ou senha inválido!'
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

module.exports = LoginController;