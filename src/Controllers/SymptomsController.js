var Auth = require('../Utils/Auth');
var Util = require('../Utils/Validators');
var SymptomsModel = require('../Models/SymptomsModel');

var SymptomsController = {

    async getSymptoms(req,res){

        var token = req.headers['x-access-token'];
        var auth = await Auth.validateToken(token);

        try{

            if(auth.valid){
                const symptoms = await SymptomsModel.getSymptoms(req,res);
                
                if(symptoms != null){
                      return res.status(200).send({
                        'sysmtomsData': symptoms,
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
    }
}

module.exports = SymptomsController;