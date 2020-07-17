require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

var Auth = {

    async generateToken(id){

        var token = await jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 30000 // expires in 5min
        });

        return token;
    },
    async validateToken(token){

        var data = {}
        if (!token){
            data.status_code = 401;
            data.valid = false;
            data.message = "Nenhum token fornecido!";
            return data;
        }
        
       jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err){
                data.status_code = 500;
                data.valid = false;
                data.message = "Falha ao autenticar token!";
            }
            else{
                data.status_code = 200;
                data.valid = true;
            }
            return data;
        });
        return data;
    }
    
}

module.exports = Auth;