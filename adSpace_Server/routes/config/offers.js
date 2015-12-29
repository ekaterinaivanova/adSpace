/**
 * Created by EkaterinaAcc on 20-Nov-15.
 */
var sql = require('../../DB/sqlDo.js');
var settings = require("../../settings.js");
var dateFormat = require('dateformat');

exports.getAllOffersOfCompany = function(companyId, callback){
    sql.getCompanysOffers(companyId, function(res, err){
        if(!err) {
            for(var i = 0; i < res.length; i++){
                var start=dateFormat(res[i].start, "dd-mmm-yy");
                console.log(start);
                res[i].start = start;
                var finish=dateFormat(res[i].finish, "dd-mmm-yy");
                res[i].finish = finish;
            }


            callback({
                data:res,
                result:true});
        }else{
            console.log(err);
           callback({
               result:false,
               response:settings.messages.error
           })
        }
    });
};

exports.getOneOffer = function(callback){
    sql.getOneOffer(function(res, err){
        if(!err){
            var start=dateFormat(res[0].start, "dd-mmm-yy");
            console.log(start);
            res[0].start = start;
            var finish=dateFormat(res[0].finish, "dd-mmm-yy");
            res[0].finish = finish;
            res.result = true;
            callback(res)
        }else{
            callback({
                result:false,
                response:settings.messages.error
            })
        }
    })
}