const options = require('../database/knex-options');
const knex = require('knex')(options);

var LoginModel = {

     async doLogin(ds_email,ds_senha){
        try{
            var user = {};

            await knex('tb_usuario')
            .select()
            .where({
                ds_email: ds_email,
                ds_senha: ds_senha
            })
            .then(function(res){
                if(res.length >= 1)
                    user = res;
                else
                    user = null;
            });
            
            return user;
        }
        catch(ex){
            throw ex;
        }
    }
}

module.exports = LoginModel;