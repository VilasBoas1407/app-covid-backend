var FollowModel = require('../Models/FollowUpModel');
var Auth = require('../Utils/Auth');
const UserModel = require('../Models/UserModel');

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
            let followUp = req.body;
            followUp.dt_consulta = new Date().toLocaleDateString().split('/').reverse().join('-');
           
            
            if(auth.valid){
                const status = await FollowModel.postFollowUp(followUp);
                //atualiza a data do ultimo followup
                let atualiza={}
                atualiza.query = req.query
                atualiza.body = {
                    ds_last_followup: new Date().toLocaleDateString().split('/').reverse().join('-')
                }
                //atualiza.body.ds_last_followup =  new Date().toLocaleDateString().split('/').reverse().join('-');

                const put = await UserModel.putUsers(atualiza,res);
                
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