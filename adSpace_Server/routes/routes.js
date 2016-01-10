/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var user = require('./config/user.js');
var offers = require('./config/offers.js');
var companies = require('./config/companies.js');
var sql = require("../DB/sqlDo.js");

//var settings = require('../settings.js');
module.exports = function(app) {


    app.get('/', function (req, res) {

        res.end("Node-Android-Project");
    });

    app.get("/offer/pics/:userId/:offerId", function(req,res ){
        var userId = req.params.userId;
        var offerId = req.params.offerId;
        sql.getOfferPicsNumber(userId,offerId, function(result, err){
            if(!err){
                res.json(result);
            }
        })
    });
    app.post("/offer/pics/:userId/:offerId/:picsN", function(req, res){
        var userId = req.params.userId;
        var offerId = req.params.offerId;
        var picsN = req.params.picsN;
        sql.updateOfferPicsNumber(userId, offerId, picsN, function( result, err){
            if(!err){
                res.json(result);
            }
        })
    });
    app.post('/login/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var password = req.params.pwd;

        user.login(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/register/:email/:pwd', function (req, res) {
        console.log(req);
        var email = req.params.email;
        var password = req.params.pwd;
        //console.log(req);
        console.log(email + " " + password);
        user.register(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });
    app.post('/register', function (req, res) {
        console.log(req.params);
        console.log(req.body);


    });


    app.post('/company/register/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var pwd = req.params.pwd;
        companies.register(email, pwd, function (found) {
            res.json(found);
        });
    });
    app.post('/company/register/:email/:pwd/:name/:address', function (req, res) {
        console.log("***** MUUUU");
        var email = req.params.email;
        var pwd = req.params.pwd;
        var name = req.params.name;
        var address = req.params.address;
        companies.registerCompanyWithNameAndAddress(email, pwd,name, address, function (found) {
            console.log("found");
            console.log(found);
            res.json(found);
        });
    });
    //adds company name and address
    app.put('/company/update/:email/:pwd/:name/:address', function (req, res) {
        var email = req.params.email;
        var pwd = req.params.pwd;
        var name = req.params.name;
        var address = req.params.address;

        companies.updateCompany(email, pwd, name, address, function (found) {
            res.json(found);
        });
    });
    app.post('/company/login/:email/:pwd', function (req, res) {
        var email = req.params.email;
        var pwd = req.params.pwd;
        companies.login(email, pwd, function (found) {
            res.json(found);
        });
    });
    //adds a new offer for a company with id == companyId
    //localhost:8080/company/add/1/Amazing name offer/Super rule/@mama@mamm/SuperPrize/26-Dec-15/14-Jan-16/Hohohoh
    app.post("/company/add/:companyId/:offerName/:offerRules/:hashtag/:prize/:start/:finish/:extra", function(req, res){
        var companyId= req.params.companyId;
        var offerName = req.params.offerName;
        var offerRules = req.params.offerRules;
        var hashtag = req.params.hashtag;
        var prize =  req.params.prize;
        var start =  req.params.start;
        var finish =  req.params.finish;
        var extra =  req.params.extra;

        companies.add(companyId,offerName,offerRules, hashtag,prize, start, finish, extra, function(result){
            //console.log("***" + result);
            res.json(result);
        })
    });
    //updates company's offer. Offer id in DB equals to offerID, company id  = companyId.
    //If offerName == null, it syays unchanged.
    //localhost:8080/company/updateoffer/9/1/Super rule/Super name/@super@puper/SuperPrize/26-Dec-15/14-Jan-16/Hohohoh
    app.put("/company/updateoffer/:offerId/:companyId/:offerRules/:offerName/:hashtag/:prize/:start/:finish/:extra", function(req, res){
        var companyId= req.params.companyId;
        var offerName = req.params.offerName;
        var offerRules = req.params.offerRules;
        var offerId = req.params.offerId;
        var hashtag = req.params.hashtag;
        var prize =  req.params.prize;
        var start =  req.params.start;
        var finish =  req.params.finish;
        var extra =  req.params.extra;

        companies.update(companyId,offerName,offerRules, offerId, hashtag,prize, start, finish, extra, function(result){
            console.log("***" + result);
            res.json(result);
        })
    });

    //returns all registered companies
    app.get("/companies", function(req,res){
        companies.getAll(function(result, err){
            if(!err){
                res.json(result);
            }
        })
    });
    //returns all offers of thecompany with companyID, if there is no offers returns []
    app.get("/offers/:companyId", function(req,res){
        var companyId = req.params.companyId;
        offers.getAllOffersOfCompany(companyId, function(result, error){
            if(error){
                console.log(error);
            }else{
                res.json(result);
            }
        });
    });
    //adds offer with the selected offer id to user
    app.post('/newpromo/:email/:offerId', function (req, res) {
        var email = req.params.email;
        var offerId = req.params.offerId;
        user.addOfferToUser(email, offerId, function(result, error){
            if(error){
                res.json({result:false})
            }else{
                res.json(result);
            }
        })
    });
    //get all user promos
    app.get('/allpromos/:email', function (req, res) {
        var email = req.params.email;
        user.getUserOffers(email, function(result, error){
            if(error){
                res.json({result:false})
            }else{
                res.json(result);
            }
        })
    });
    app.get('/onepromo', function (req, res) {
        offers.getOneOffer(function(result, error){
            if(error){
                res.json({result:false})
            }else{
                res.json(result);
            }
        })
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

};