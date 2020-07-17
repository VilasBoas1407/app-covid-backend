var FollowModel = require('../Models/FollowUpModel');
var Auth = require('../Utils/Auth');

var FollowUpController = {

    async GetFollowUp(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);

            if(auth.valid){
                const user = await FollowModel.getFollowUp(req,res);
                
                if(user != null){
                      return res.status(200).send({
                        'userData': user,
                        });
                }
                else{
                    return res.status(200).send({
                        'message':'Não foram encontrados registros!'
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
    async PostFollowUp(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);
            const followUp = req.body.followUp;

            if(auth.valid){
                const status = await FollowModel.postFollowUp(followUp);
                if(status){
                    return res.status(200).send({
                        'valid' : true,
                        'message': 'Respostas cadastradas com sucesso!'
                    });
                }
                else{
                    return res.status(200).send({
                        'valid' : false,
                        'message': 'Ocorreu um erro ao cadastrar as respostas!'
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
};

module.exports = FollowUpController;