
var sql = require("./sqlDB.js");

var registerNewUser = function(email, password, callback){
    returnUserIfUserExists(email, function(res, err){
        if(err){
            console.log("Error appeared " + err);
        }else{
            if(res == null){
                //register a new user
                var query = "INSERT INTO users_adspace (email, password) VALUES (?, ?);";
                var insert = [email, password];
                sql.exacuteQueryWithArgs(query, insert, function(result, error){
                    if(error){
                        console.log(error);
                        throw  error
                    }else{
                        console.log(result.insertId);
                        return callback("AOK");
                    }
                });
            }else{
                return(callback("NOK"));
            }
        }
    })
};


//Check if user with email exists
//if exists return pwd and id_user
//else return null
var returnUserIfUserExists = function(email, callback){
    var query = 'SELECT * from users_adspace where email Like ?';
    var insert = [email];
    sql.exacuteQueryWithArgs(query, insert, function(result, error){
        console.log("Were found " + result.length +" rows.");
        if(result.length < 1){
            return callback(null);
        }else{
            return callback(result);
        }
    });
};

//Check if user with email exists
//if exists return pwd and id_user
//else return null
var returnIfExists = function(email, who, callback){
    var query = 'SELECT  * from ' + who + '  where email Like ?';
    var insert = [email];
    console.log(query);
    sql.exacuteQueryWithArgs(query, insert, function(result, error){
        console.log("Were found " + result.length +" rows.");
        if(result.length < 1){
            return callback(null);
        }else{
            return callback(result);
        }
    });
};
var registerNew = function(email, password, where, callback){
    returnIfExists(email, where, function(res, err){
        if(err){
            console.log("Error appeared " + err);
        }else{
            if(res == null){
                //register a new user
                var query = "INSERT INTO "+ where +" (email, password) VALUES (?, ?);";
                var insert = [email, password];
                sql.exacuteQueryWithArgs(query, insert, function(result, error){
                    if(error){
                        console.log(error);
                        //throw  error
                    }else{
                        console.log(result.insertId);
                        return callback("AOK");
                    }
                });
            }else{
                return(callback("NOK"));
            }
        }
    })
};
//TODO implement promo add logic

//module.exports.registerNewUser=registerNewUser;
module.exports.returnUserIfUserExists=returnUserIfUserExists;
module.exports.registerNew=registerNew;
module.exports.returnIfExists = returnIfExists;