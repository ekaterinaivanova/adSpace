/**
 * Created by EkaterinaAcc on 19-Nov-15.
 */
/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto');
var sql = require('../../DB/sqlDo.js');
var settings = require("../../settings.js");

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