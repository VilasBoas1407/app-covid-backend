const options = require('../database/knex-options');
const knex = require('knex')(options);

var CompanyModel = {
    async getCompany(){
        try{
            var users = {};

            await knex('tb_empresa')
            .select('id_emp', 'ds_nome','ds_cnpj','ds_email','dt_cadastro', 'ds_telefone')
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
    async postCompany(req, res){
        try{
            //const { user } = req.body
            await knex('tb_empresa').insert(
                req.body
            )
            return res.status(201).send()
        } catch (error){
            throw error
        }
    },
    async putCompany(req,res){
        try{
            //const { user } = req.body
            //const { id } = req.params

            await knex('tb_empresa')
            .update(req.body)
            .where(req.query)

            return res.send()
        } catch (error){
            throw error
        }
    }

}
module.exports = CompanyModel;
