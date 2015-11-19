/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
//var chgpass = require('config/chgpass');
var register = require('./config/register.js');
var login = require('./config/login.js');
var company_register = require('./config/company_reg.js');
var company_login = require('./config/company_login.js');


module.exports = function(app) {


    app.get('/', function (req, res) {

        res.end("Node-Android-Project");
    });


    app.post('/login/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var password = req.params.pwd;

        login.login(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/register/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var password = req.params.pwd;
        //console.log(req);
        console.log(email + " " + password);
        register.register(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/company/register/:email/:pwd', function (req, res) {
        //console.log("****" + req.params.email + " "+ req.params.pwd);
        var email = req.params.email;
        var pwd = req.params.pwd;
        company_register.register(email, pwd, function (found) {
            console.log("***" + found);
            res.json(found);
        });
    });

    app.post('/company/login/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var pwd = req.params.pwd;
        company_login.login(email, pwd, function (found) {
            console.log("***" + found);
            res.json(found);
        });
    });

    app.post("company/add/:id/:promoname/", function(req, res){

    });

    //app.post('/api/chgpass', function (req, res) {
    //    var id = req.body.id;
    //    var opass = req.body.oldpass;
    //    var npass = req.body.newpass;
    //
    //    chgpass.cpass(id, opass, npass, function (found) {
    //        console.log(found);
    //        res.json(found);
    //    });
    //});


    //app.post('/api/resetpass', function (req, res) {
    //
    //    var email = req.body.email;
    //
    //    chgpass.respass_init(email, function (found) {
    //        console.log(found);
    //        res.json(found);
    //    });
    //});

    //app.post('/api/resetpass/chg', function(req, res) {
    //
    //    var email = req.body.email;
    //    var code = req.body.code;
    //    var npass = req.body.newpass;
    //
    //    chgpass.respass_chg(email,code,npass,function(found){
    //        console.log(found);
    //        res.json(found);
    //    });
    //});
};