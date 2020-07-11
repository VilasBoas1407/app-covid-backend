var FollowModel = require('../Models/FollowUpModel');
var Auth = require('../Utils/Auth');

var FollowUpController = {

    async GetFollowUp(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            var auth = await Auth.validateToken(token);

            if(auth.valid){
                const user = await FollowModel.getFollowUp();
                
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

            if(auth.valid){
                await FollowModel.postFollowUp(req,res);
                
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

module.exports = FollowUpController;