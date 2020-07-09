const options = require('../database/knex-options');
const knex = require('knex')(options);

var UserModel = {

     async getUsers(){
        try{
            var users = {};

            await knex('tb_usuario')
            .select()
            .then(function(res){
                if(res.length >= 1)
                    users = res;
                else
                    users = null;
            });
            
            return users;
        }
        catch(ex){
            throw ex;
        }
    }
}

module.exports = UserModel;