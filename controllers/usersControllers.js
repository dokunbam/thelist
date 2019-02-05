const knex = require('../model/connection');
const Joi = require('joi');
var slug = require('slug');

exports.index = function(req, res)
{
    // USER DASHBOARD
    res.render('user/dashboard');

}

exports.register = function(req, res)
{
    //REGISTER USER FORM PAGE
    res.render('user/register');

}

exports.registeruser = function(req, res)
{
    //REGISTER USER HANDLE
   const { username, email, password, password1 } = req.body

    //validating the fields
    const schema = Joi.object().keys({
		username: Joi.string().trim().min(6).max(50).required(),
        email: Joi.string().email().trim().required(),
        fullname: Joi.string().trim().min(6).max(50).required(),
        dob: Joi.number().integer().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        password1: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)

    });

	Joi.validate(req.body, schema, (err, result) => {
        let error = [];
        
        if(err){
            console.log(err);
           // error.push({msg: "Password does not match"});
            res.render('user/register', {err});    
        }

        if(password !== password1){
            error.push({msg: "Password does not match"});
            console.log(error);
            res.render('user/register', {error});
        }

        var url = slug(req.body.fullname, {lower: true});
            //TODO 
        //HASH THE PASSWORD
        //CHECK IF USER AND EMAIL EXIST

        knex('author').insert({
			username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname,
			password: req.body.password,
			password1: req.body.password1,
			url: url,
			dob: req.body.dob
		}).then(function(result){
			res.render('user/dashboard', {result});
		});
    });
};

exports.login = function(req, res)
{
    //LOGIN USER FORM PAGE
    res.render('user/login');

}
