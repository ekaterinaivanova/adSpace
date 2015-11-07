/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto');
//var rand = require('csprng');
var sql = require('../../DB/sqlDo.js');


exports.register = function(email, password, callback) {
    if(email != null && password != null){
            //var temp =rand(160, 36);
            //var newpass = temp + password;
            //var token = crypto.createHash('sha512').update(email +rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(password).digest("hex");

        sql.registerNewUser(email, hashed_password, function(result, error){
            if(error){
                console.log(error);
            }else{
                //if result AOK user has been registered
                //else if NOK user already have an account
                return callback(result);
            }
        });
    }
};