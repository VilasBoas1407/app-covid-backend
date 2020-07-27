var UserModel = require('../Models/UserModel');
var Auth = require('../Utils/Auth');
const { getWhoAnswered } = require('../Models/UserModel');


var UserController = {
    
    async GetUsers(req,res) {
        
        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);
            
            if(auth.valid){
                const user = await UserModel.getUsers(req,res);
                
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
    async PostUsers(req,res) {

        try{
            
            const userData = req.body.userData;

            const validEmail = await UserModel.validEmail(userData.ds_email);
            
            if(!validEmail){
                
                var user = await UserModel.postUsers(userData);

                if(user){
                    return res.status(200).send({
                        'valid':true,
                        'message': 'Usuário cadastrado com sucesso!'
                    });
                }
                else{
                    return res.status(500).send({
                        'valid' : false,
                        'message' : 'Ocorreu um erro ao cadastrar o usuário!'
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
                'message' : 'Ocorreu um erro interno!'
            });
        }
    },
    async PutUsers(req,res) {
        try{

            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);
            
            if(auth.valid){
                const user = await UserModel.putUsers(req,res);
                
                if(user != null){
                      return res.status(200).send({
                        'userData': user,
                        });
                }
                else{
                    return res.status(200).send({
                        'message':'Não foi possivel atualizar os dados!'
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
    async getLastAnswer(req,res){
        try{
            var token = req.headers['x-access-token'];
            const idUser = req.query.idUser;

            var auth = await Auth.validateToken(token);
            
            if(auth.valid){
                var Data =  new Date().toLocaleDateString().split('/').reverse().join('-');
               
                const answer = await UserModel.getLastAnswer(idUser,Data);
               
                if(answer != null){

                    const lastAnswer = answer[0].dt_consulta.toLocaleDateString().split('/').reverse().join('-');;
                    
                    if(lastAnswer === Data){
                        return res.status(200).send({
                            'valid': false,
                        });
                    }
                    else{
                        return res.status(200).send({
                            'valid' : true,
                            'answerData': answer,
                        });
                    }
                }
                else{
                    return res.status(200).send({
                        'valid': true
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
    async GetWhoAnswered(req,res) {
        
        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);
            
            if(auth.valid){
                const user = await UserModel.getWhoAnswered(req,res);
                
                if(user != null){
                      return res.status(200).send({
                        'userData': user,
                        });
                }
                else{
                    return res.status(200).send({
                        'message':'todos os funcionarios responderam!'
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
    }

};

module.exports = UserController;