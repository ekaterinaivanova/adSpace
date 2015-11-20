var settings = require("../settings");
var mysql      = require('mysql');
var pool = mysql.createPool(
    settings.sqlSettings
);

var exacuteQuery = function(sqlQuerry, callback){
    console.log(sqlQuerry);
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            throw err;
        }
        connection.query(sqlQuerry, function(error, result){
            if (error){
                console.log(error);
                throw error;
            }
            return callback(result);
        });
        connection.release();
        console.log("updateUserLogOnDisconect conection id " + connection.threadId+ " has been released!");
    });
};

var exacuteQueryWithArgs = function(sqlQuerry, data,  callback){
    console.log(sqlQuerry);
    console.log(data);
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            //throw err;
        }else{
            connection.query(sqlQuerry, data, function(error, result){
                if (error){
                    console.log(error );
                    //throw error;
                }
                return callback(result);
            });
            connection.release();
            console.log("updateUserLogOnDisconect conection id " + connection.threadId+ " has been released!");
        }

    });
};
module.exports.exacuteQuery = exacuteQuery;
module.exports.exacuteQueryWithArgs = exacuteQueryWithArgs;
