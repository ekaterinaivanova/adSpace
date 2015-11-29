var settings = require("../settings.js");
var sql = require("./sqlDB.js");


//Check if user/company with email exists
//if exists return pwd and id_user
//else return null
var returnIfExists = function(email, who, callback){
    var query = 'SELECT  * from ' + who + '  where email Like ?';
    var insert = [email];
    console.log(query);
    sql.exacuteQueryWithArgs(query, insert, function(result, error){
        if(error){
            console.log(error)
        }else{
        console.log("Were found " + result.length +" rows.");
        if(result.length < 1){
            return callback(null);
        }else{
            return callback(result);
        }
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
                sql.exacuteQueryWithArgs(query, insert, function(result,error){
                    if(error){
                        console.log(error + "****");
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

var addPromo = function(companyId, offerName, offerRules, callback){
    var query = "INSERT INTO "+ settings.tables_names.offers + " (company_id, name, rules) VALUES (?, ?, ?);";
    var insert = [companyId, offerName, offerRules];
    sql.exacuteQueryWithArgs(query,insert, function(res, err){
        if(err){
            console.log(err);
        }else{
            console.log(res.insertId);
            if(res.insertId != null){
                return callback({status:"AOK", offerId: res.insertId});
            }else{
                return callback({status: "NOK"});
            }

        }
    });
};

//updates promotion info
// if string for offerName == "null" name will not be updated
var updatePromo = function(companyId,  offerName, offerRules, offerId, callback){
    var query =     "UPDATE " + settings.tables_names.offers + " SET name = ?, rules = ?  WHERE id=? and company_id = ?;";
    var insert = [offerName, offerRules, offerId, companyId];
    if( offerName == "null") {
         query = "UPDATE " + settings.tables_names.offers + " SET  rules = ?  WHERE id=? and company_id = ?;";
         insert = [offerRules, offerId, companyId];
    }
    sql.exacuteQueryWithArgs(query,insert, function(res, err){
        if(err){
            console.log(err);
        }else{
            console.log("We changed " + res.changedRows + " rows.");
            if(res.changedRows > 0){
                console.log("1.We changed " + res.changedRows + " rows.");
                return callback({status:"AOK"});
            }else{
                console.log("0.We changed " + res.changedRows + " rows.");

                return callback({status: "NOK"});
            }

        }
    });
};

var getAllCompanies= function(callback){
    var query = "SELECT id, name, address, email FROM " + settings.tables_names.company;
    sql.exacuteQuery(query, function(res, err){
       if(err){
           console.log(err);
       }else{
           var jsonRes = JSON.stringify(res);
           console.log(jsonRes);
            callback(res);
       }
    });
};
var getCompanysOffers= function(companyId, callback){
    var query = "SELECT id, name, rules  FROM " + settings.tables_names.offers + " WHERE company_id = " + companyId ;
    sql.exacuteQuery(query, function(res, err){
        if(err){
            console.log(err);
        }else{
            callback(res);
        }
    });
};

var updateCompany = function(email, pwd, name, address, callback){
    returnIfExists(email,settings.tables_names.company,function(result, error){
        if(error){
            console.log(error);
        }else{
            password = result[0].password;
            //check pwd match
            if(password != pwd){

                callback({status:"WP"}); //wrong password
            }else{
                var id = result[0].id;
                var query =     "UPDATE " + settings.tables_names.company + " SET name = ?, address = ?  WHERE id=?;";
                var insert = [name, address, id];
                sql.exacuteQueryWithArgs(query, insert, function(res, err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(res.changedRows);
                        if(res.changedRows > 0){
                            callback({  status:"AOK"});
                        }else{
                            callback({status:"NOK"});//Something went wrong
                        }
                    }
                })
            }
            //console.log(result[0].password);
        }
    })

};
module.exports.getCompanysOffers = getCompanysOffers;
module.exports.getAllCompanies = getAllCompanies;
module.exports.registerNew=registerNew;
module.exports.returnIfExists = returnIfExists;
module.exports.addPromo = addPromo;
module.exports.updatePromo = updatePromo;
module.exports.updateCompany = updateCompany;