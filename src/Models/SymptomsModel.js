const options = require('../database/knex-options');
const { get } = require('http');
const { getSymptoms } = require('../Controllers/SymptomsController');
const knex = require('knex')(options);

var SymptomsModel ={

    async getSymptoms(req,res){
        try{
            var symptoms = {};
        
            await knex('tb_sintomas')
            .select()
            .then(function(res){
                if(res.length >= 1)
                    symptoms = res;
                else
                    symptoms = null;
            });
            
            return symptoms;
        }
        catch(ex){
            throw ex;
        }
    }
}

module.exports = SymptomsModel;