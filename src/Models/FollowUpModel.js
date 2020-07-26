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
    async postFollowUp(followup){
        try{
            
            var valid = false
            await knex('tb_acompanhamento').insert(
                followup
            ).then(function(res){
                return valid = true;
            })
            .catch(function(err){
                return valid;
            })

        } catch (error){
            throw error
        }
        return valid;
    }

}
module.exports = FollowUpModel;