/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto');
//var rand = require('csprng');
var sql = require('../../DB/sqlDo.js');
var validator = require("email-validator");
var settings = require("../../settings.js");
exports.register = function(email, password, callback) {
    console.log(validator.validate(email));
        if (validator.validate(email) ){

            //if(email != null && password != null){
            //var temp =rand(160, 36);
            //var newpass = temp + password;
            //var token = crypto.createHash('sha512').update(email +rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(password).digest("hex");

        sql.registerNew(email, hashed_password, settings.tables_names.users,  function(result, error) {
            if (error) {
                console.log(error);
            } else {
                //if result AOK user has been registered
                //else if NOK user already have an account
                if (result == "AOK") {
                    return callback({'response': settings.messages.reg_success, "result": true});
                } else{
                return callback({'response':  settings.messages.reg_failed, "result": false});
            }
            }
        });
    }else{
            return callback({'response':  settings.messages.reg_failed_wrong_email_format, "result": false})
        }
};