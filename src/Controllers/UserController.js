var UserModel = require('../Models/UserModel');
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

var UserController = {

    async GetUsers(req,res) {

        try{
            var token = req.headers['x-access-token'];
            
            if (!token)
                 return res.status(401).json({ auth: false, message: 'No token provided.' });

            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err)
                     return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            });
            

            const user = await UserModel.getUsers();

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
        catch(err){
            return res.status(500).send({
                'error' : err
            });
        }
    }

};

module.exports = UserController;