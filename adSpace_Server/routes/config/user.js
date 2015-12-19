
/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto');
//var rand = require('csprng');
var sql = require('../../DB/sqlDo.js');
var validator = require("email-validator");
var settings = require("../../settings.js");

// Registration
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
                } else if(result == "UAE"){
                    return callback({'response': settings.messages.user_already_exists, "result": false});
                }else{
                    return callback({'response':  settings.messages.reg_failed, "result": false});
                }
            }
        });
    }else{
        return callback({'response':  settings.messages.reg_failed_wrong_email_format, "result": false})
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Login
///////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.login = function(email,password,callback) {
    sql.returnIfExists(email, settings.tables_names.users, function(result, error){
        if(error){
            console.log(error);
            callback({'response':"Login Failed, intearnal error!","result":false});

        }
        if (result == null){
            callback({'response':"Login Failed, user does not exist!","result":false});
        }else {
            var user_id = result[0].user_id;
            var name = result[0].name;
            var lastname = result[0].lastname;
            var points = result[0].points;
            var hashed_password = result[0].password;
            var recieved_password = crypto.createHash('sha512').update(password).digest("hex");
            if (hashed_password == recieved_password) {
                callback({
                    'response': settings.messages.login_success,
                    "result": true,
                    "id": user_id,
                    'name': name,
                    'lastname': lastname,
                    'points': points
                });
            } else {
                callback({'response': settings.messages.login_failed_wrong_pwd, "result": false});
            }
        }
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Offer
///////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.addOfferToUser = function(userEmail, offerId, callback){
    sql.addOfferToUser(userEmail, offerId, function(result, error){
            if(!error){
                callback(result);
            }
    })
};
exports.getUserOffers = function(userEmail, callback){
    sql.getUserOffers(userEmail, function(result, error){
        if(!error){
            callback({
                result:true,
                data: result
            });
        }
    })
};