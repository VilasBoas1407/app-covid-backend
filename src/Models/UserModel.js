const options = require('../database/knex-options');
const knex = require('knex')(options);

var UserModel = {

     async getUsers(req,res){
        try{
            var users = {};

            await knex('tb_usuario')
            .where(req.query)
            .select('id_usuario','id_emp', 'ds_nome','ds_cpf','ds_email','dt_cadastro', 'ds_telefone')
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
    },
    async postUsers(userData){

            let valid = false;     

            await knex('tb_usuario').insert(
                userData
            ).then(function(res) {
                valid = true;
            }).catch(function(err) {
                throw err;
            });

            return valid;
    },
    async putUsers(req,res){
        try{
            const { id } = req.params
            
            await knex('tb_usuario')
            .update( req.body )
            .where(req.query)

            return res.send()
        } catch (error){
            throw error
        }
    },
    async validEmail(ds_email){
        try{
            var email = {};

            await knex('tb_usuario')
            .select('ds_email')
            .where({
                ds_email: ds_email,
            })
            .then(function(res){
                if(res.length >= 1)
                    email = res;
                else
                    email = null;
            });
            
            return email;
        }
        catch(ex){
            throw ex;
        }
    },
    async getLastAnswer(id_usuario,data){
        try{
            var answer = {};

            await knex('tb_acompanhamento')
            .select()
            .where({
                id_usuario: id_usuario,
            })
            .orderBy('dt_consulta', 'desc')
            .limit(1)
            .then(function(res){
                if(res.length >= 1)
                    answer = res;
                else
                    answer = null;

            });
            return answer;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = UserModel;