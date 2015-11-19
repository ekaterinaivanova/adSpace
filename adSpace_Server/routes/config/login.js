/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto');
//var rand = require('csprng');
var sql = require('../../DB/sqlDo.js');
var settings = require("../../settings.js");

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