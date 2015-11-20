/**
 * Created by EkaterinaAcc on 20-Nov-15.
 */
var sql = require('../../DB/sqlDo.js');
var settings = require("../../settings.js");


exports.getAllOffersOfCompany = function(companyId, callback){
    sql.getCompanysOffers(companyId, function(res, err){
        if(!err) {
            callback(res, null);
        }else{
            console.log(err);
            //callback(null, err);
        }
    });

};