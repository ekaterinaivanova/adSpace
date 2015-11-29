/**
 * Created by EkaterinaAcc on 20-Nov-15.
 */
var sql = require('../../DB/sqlDo.js');
var crypto = require('crypto');
//var rand = require('csprng');
var validator = require("email-validator");
var settings = require("../../settings.js");

exports.getAll = function(callback){
    sql.getAllCompanies(function(res, err){
        if(!err)
            callback(res);
    } );

};
exports.registerCompanyWithNameAndAddress = function(email, pwd, name, address,callback){
    var hashed_password = crypto.createHash('sha512').update(pwd).digest("hex");
    sql.registerCompanyWithNameAndAddress(email, hashed_password, name, address, function(result, error){
        console.log(result);
        console.log("***********");
                if(error){
                    console.log(error);
                    callback({
                        status:false,
                        response: settings.messages.error})
                }else{
                    if(result.status == "AOK"){
                        callback({
                            status:true,
                            response:settings.messages.reg_success,
                            email:email,
                            address:address,
                            name:name
                        })
                    }else if(result.status == "UAE"){
                        //User already exsists
                        callback({
                            status:false,
                            response: settings.messages.company_already_exists})
                    }else{
                        //reg failed
                        callback({
                            status:false,
                            response: settings.messages.reg_failed})
                    }
                }
    });
};
exports.updateCompany = function(email, pwd, name, address,callback){
    var hashed_password = crypto.createHash('sha512').update(pwd).digest("hex");
    sql.updateCompany(email, hashed_password, name, address, function(result, error){
        if(error){
            console.log(error)
        }else{
            if(result.status == "AOK"){
                callback({  result: true,
                            response: settings.messages.company_update_success,
                            email:email,
                            name:name,
                            address:address
                })
            }else if(result.status == "NOK"){
                callback({
                    result: false,
                    response:settings.messages.company_update_failed //DB error

                })
            }else{
                callback({
                    result: false,
                    response:settings.messages.company_update_access_failed //Wrong pwd
                })
            }
        }
    })
};
//add offer
exports.add = function(companyId, offerName, offerRules, callback){
    sql.addPromo(companyId, offerName, offerRules, function(res, err){
        if(err){
            console.log(err);
        }else{
            if(res.status == "AOK"){
                callback({
                    'response': settings.messages.company_add_success,
                    "result": true,
                    "offer_id":res.offerId,
                    'name': offerName,
                    'rules': offerRules
                });
            }
        }
    });
};
//update offer
exports.update = function(companyId, offerName, offerRules, offerId, callback){
    sql.updatePromo(companyId, offerName, offerRules, offerId, function(res, err){
        if(err){
            console.log(err);
        }else{
            if(res.status == "AOK"){
                callback({
                    'response': settings.messages.company_update_success,
                    "result": true,
                    "offer_id":offerId,
                    'name': offerName,
                    'rules': offerRules,
                });
            }else{
                callback({
                    'response': settings.messages.update_offer_failed,
                    "result": false
                });
            }
        }
    } );
};

exports.login = function(email,password,callback) {

    sql.returnIfExists(email,settings.tables_names.company, function(result, error){
        console.log("*****");
        if(error){
            console.log(error);
            callback({'response':settings.messages.login_failed_internal_error,"result":false});

        }
        if (result == null){
            callback({'response':settings.messages.company_login_failed,"result":false});
        }else {
            console.log(result);
            var user_id = result[0].id;
            var name = result[0].name;
            var address = result[0].address;
            //var points = result[0].points;
            var hashed_password = result[0].password;
            var recieved_password = crypto.createHash('sha512').update(password).digest("hex");
            if (hashed_password == recieved_password) {
                callback({
                    'response': settings.messages.login_success,
                    "result": true,
                    "id": user_id,
                    'name': name,
                    'address': address
                });
            } else {
                callback({'response': settings.messages.login_failed_wrong_pwd, "result": false});
            }
        }

    });
};
exports.register = function(email, password, callback) {
    console.log(validator.validate(email));
    if (validator.validate(email) ){

        //if(email != null && password != null){
        //var temp =rand(160, 36);
        //var newpass = temp + password;
        //var token = crypto.createHash('sha512').update(email +rand).digest("hex");
        var hashed_password = crypto.createHash('sha512').update(password).digest("hex");

        sql.registerNew(email, hashed_password,settings.tables_names.company, function(result, error) {
            if (error) {
                console.log(error);
            } else {
                //if result AOK user has been registered
                //else if NOK user already have an account
                if (result == "AOK") {
                    return callback({
                        'response': settings.messages.reg_success,
                        "result": true,
                        email:email
                    });
                } else if(result == "UAE"){
                    return callback({'response': settings.messages.company_already_exists, "result": false});
                }else{
                    return callback({'response': settings.messages.reg_failed, "result": false});
                }
            }
        });
    }else{
        return callback({'response': settings.messages.reg_failed_wrong_email_format, "result": false})
    }
};