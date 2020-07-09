var LoginModel = require('../Models/LoginModel');

var LoginController = {

    async LoginUser(req,res) {

        try{
            const {ds_email, ds_senha } = req.body;

            const user = await LoginModel.doLogin(ds_email,ds_senha);
            
            if(user != null)
                return res.status(200).send({'userData': user});
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