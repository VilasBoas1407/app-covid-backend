const options = require('../database/knex-options');
const knex = require('knex')(options);

var FollowUpModel = {
    async getFollowUp(req, res){
        try{
            var users = {};
            //const { id } = req.params
        
            await knex('tb_acompanhamento')
            .select('tb_acompanhamento.id_usuario','dt_consulta','ds_nome','id_sintoma','ds_telefone', 'ds_usa_epi')
            .leftJoin('tb_usuario','tb_acompanhamento.id_usuario','tb_usuario.id_usuario')
            .where(req.query).orderByRaw(' dt_consulta desc, length(id_sintoma) desc')
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
    async postFollowUp(req, res){
        try{
            const { user } = req.body
            await knex('tb_acompanhamento').insert(
                req.body
            )
            return res.status(201).send()
        } catch (error){
            throw error
        }
    }

}
module.exports = FollowUpModel;