var Validators = {

    hasValue(value){
        if(value == null || value == undefined || value == "" || value == '')
            return false;
        else
            return true;
    }
}

module.exports = Validators;