const options = require('../database/knex-options');
const knex = require('knex')(options);

var CompanyModel = {
    async getCompany(){
        try{
            var users = {};

            await knex('tb_empresa')
            .select('id_emp', 'ds_nome','ds_email','dt_cadastro', 'ds_telefone').orderBy('ds_nome','desc')
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
    async postCompany(company){
        try{

            let valid = false;

            await knex('tb_empresa').insert(
                company
            ).then(function(res){
                 valid = true
            })
            .catch(function(err){
                throw error;
            });
            
            return valid;

        } catch (error){
            throw error;
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
    },
    async validEmail(ds_email){
        try{
            var email = {};

            await knex('tb_empresa')
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
    }

}
module.exports = CompanyModel;
