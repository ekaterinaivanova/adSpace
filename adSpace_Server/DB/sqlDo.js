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

var returnPromoIfExists = function(id, callback){
    var query = 'SELECT  * from offers  where id = ?';
    var insert = [id];
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
                        return callback("NOK");
                    }else{
                        console.log(result.insertId);
                        return callback("AOK");
                    }
                });
            }else{
                return(callback("UAE"));
            }
        }
    })
};

var addPromo = function(companyId, offerName, offerRules,hashtag,prize,start, finish, extra, callback){
    var query = "INSERT INTO "+ settings.tables_names.offers + " (company_id, name, rules, hashtags, prize,start, finish, extra) VALUES (?, ?, ?,?,?,?,?,?);";
    var insert = [companyId, offerName, offerRules,hashtag, prize,start, finish, extra];
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
var updatePromo = function(companyId,  offerName, offerRules, offerId,hashtag,prize,start, finish, extra, callback){
    var query =     "UPDATE " + settings.tables_names.offers + " SET name = ?, rules = ?, hashtags = ? ,prize = ?,start = ?, finish = ?, extra = ? WHERE id=? and company_id = ? ;";
    var insert = [offerName, offerRules,hashtag,prize,start, finish, extra, offerId, companyId];
    if( offerName == "null") {
         query = "UPDATE " + settings.tables_names.offers + " SET  rules = ?,  hashtags = ? ,prize = ?,start = ?, finish = ?, extra = ? WHERE id=? and company_id = ?;";
         insert = [offerRules,hashtag,prize,start, finish, extra, offerId, companyId];
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
    var query = "SELECT *  FROM " + settings.tables_names.offers + " WHERE company_id = " + companyId ;
    sql.exacuteQuery(query, function(res, err){
        if(err){
            console.log(err);
        }else{
            callback(res);
        }
    });
};
var registerCompanyWithNameAndAddress = function(email, pwd, name, address, callback){
    returnIfExists(email,settings.tables_names.company,function(result, error){
            if(result == null){
                var query = "INSERT INTO "+ settings.tables_names.company +" (email, password, name, address) VALUES (?, ?,?,?);";
                var insert = [email, pwd, name, address];
                sql.exacuteQueryWithArgs(query, insert, function(res, err){
                    if(err){
                        console.log("error 127");

                        console.log(error);
                        callback({status:"NOK"});
                    }else{
                        console.log("res 132");
                        console.log(res);
                        if(res.insertId != null){
                            return callback({status:"AOK", companyId: res.insertId});
                        }
                    }
                })
            }else{
                console.log("result 139");

                console.log(result);
                callback({status: "UAE"}); //user already exists
            }
    });

    };
var updateCompany = function(email, pwd, name, address, callback){
    returnIfExists(email,settings.tables_names.company,function(result, error){
        if(error){
            console.log(error);
            callback({status:"NOK"});//Something went wrong
        }else if(result!= null){
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
        }else{
            callback({status:"NOK"});//Something went wrong
        }
    })

};
var addOfferToUser = function(userEmail,offerId, callback){
    returnPromoIfExists(offerId, function(result, error){
        if(!error && result != null){
            returnIfExists(userEmail, settings.tables_names.users,function(res, err){
                if(!err && res!=null){
                    var userId = res[0].user_id;
                    query = "INSERT into " + settings.tables_names.user_offers + " (user_ID, offer_ID) VALUES(?,?);";
                    values = [userId, offerId];
                    sql.exacuteQueryWithArgs(query, values, function(result, error){
                        if(error){
                            callback({result:false,
                            response:settings.messages.error})
                        }else{
                            callback({result:true})
                        }
                    })
                }
            })
        }
    })
};
var getUserOffers= function(userEmail, callback){
    returnIfExists(userEmail, settings.tables_names.users,function(res, err){
        if(!err && res!=null) {
            var value = [res[0].user_id];
            var query = " SELECT * FROM " + settings.tables_names.offers + " WHERE id IN (SELECT DISTINCT(offer_ID) FROM " + settings.tables_names.user_offers + " WHERE user_id = ? );"
            sql.exacuteQueryWithArgs(query, value, function(result, error){
                if(!error){
                    callback(result);
                }
            })
        }
    })
};
var getOneOffer = function(callback){
    var query = "SELECT * from " + settings.tables_names.offers + " WHERE start > now()";
    sql.exacuteQuery(query, function(res, err){
        if(!err){
            callback(res);
        }
    })
};
module.exports.getOneOffer = getOneOffer;

module.exports.getUserOffers = getUserOffers;
module.exports.addOfferToUser =  addOfferToUser;
module.exports.registerCompanyWithNameAndAddress = registerCompanyWithNameAndAddress;
module.exports.getCompanysOffers = getCompanysOffers;
module.exports.getAllCompanies = getAllCompanies;
module.exports.registerNew=registerNew;
module.exports.returnIfExists = returnIfExists;
module.exports.addPromo = addPromo;
module.exports.updatePromo = updatePromo;
module.exports.updateCompany = updateCompany;