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
    async postUsers(req, res){
        try{
            //const { user } = req.body
            
            await knex('tb_usuario').insert(
                req.body
            )
            return res.status(201).send()
        } catch (error){
            
            throw error
        }
    },
    async putUsers(req,res){
        try{
            //const { user } = req.body
            const { id } = req.params
            
            //console.log(req.params)
            await knex('tb_usuario')
            .update( req.body )
            .where(req.query)

            return res.send()
        } catch (error){
            throw error
        }
    }
}

module.exports = UserModel;