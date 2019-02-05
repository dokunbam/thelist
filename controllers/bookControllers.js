const Joi = require('joi');
const knex = require('../model/connection');
var slug = require('slug');
var filename = require('../codeinclude/images-code');


// Display list of all Authors.
exports.index = function (req, res, next) 
{
	knex.select().from('book').orderBy('id', 'desc').then(function(result){
		res.render('index', {result});
	});
}

exports.addbooks = function (req, res)
{
	const schema = Joi.object().keys({
		book_name: Joi.string().trim().min(6).max(50).required(),
		summaries: Joi.string().trim().required(),
		isbn: Joi.number().required(),
		categories: Joi.string().trim().required(),
		
	});
	Joi.validate(req.body, schema, (err, result) => {
		if(err){
			//console.log(err)
			return res.redirect("/");
		}

		var url = slug(req.body.categories, {lower: true});
		var book_url = slug(req.body.book_name, {lower: true});
		
		//I have to get the auth user and add to the field later
		var author = "1";
		//var newfilename = req.file.originalname;


        //Perform knex insert into db
		knex('book').insert({
			book_name: req.body.book_name,
			author: author,
			summary: req.body.summaries,
			isbn: req.body.isbn,
			category: req.body.categories,
			image: req.file.originalname,
			url: url,
			book_url: book_url

		}).then(function(result){
			//console.log(err)
			//console.log("This is the image name from controller " + newfilename);
			return res.redirect('/');
		});
	});
}

//function to select db, check if id is undefined and render view
function selectAndrender(id, res, viewname){
	if(typeof id != 'undefined'){
		knex.select().from('book').where('id', id).first().then(function(result){
			res.render(viewname, {result});
		});
	}else{
		res.status(500);
		res.render('error', {message: 'Invalid id'});
	}

}

exports.vieweachbook = function(req, res){
	const id = req.params.id;
	//call selectAndrender function here
	selectAndrender(id, res, 'details' );
}

exports.edit = function(req, res){
	//res.send("edit");
	const id = req.params.id;
	selectAndrender(id, res, 'editpage');
	//console.log("edited")
}

exports.update = function(req, res){
	const schema = Joi.object().keys({
		book_name: Joi.string().trim().min(6).max(50).required(),
		summaries: Joi.string().trim().required(),
		isbn: Joi.number().required(),
		categories: Joi.string().trim().required(),
		
	});
	Joi.validate(req.body, schema, (err, result) => {
		if(err){
	//		console.log(err)
			return res.redirect("/");
		}
         const image = req.file.originalname;
        //Perform knex insert into db
		knex('book').where('id', req.params.id).update({
			book_name: req.body.book_name,
			summary: req.body.summaries,
			isbn: req.body.isbn,
			image: image,
			category: req.body.categories
		}).then(function(result){
			//console.log(result);
			return res.redirect('/');
			//knex.destroy();
		});
	});
}


exports.delete = function(req, res){
	const id = req.params.id; 
	if(typeof id != 'undefined'){
		knex.select().from('book').where('id', id).del().then(function(results){
	//		console.log("deleted");
			return res.redirect('/');
		});
	}else{
		res.status(500);
		res.render('error', {message: 'Invalid id'});
	//	console.log(message);
	}

}



//exports.registeruser = function(req, res)
//{
    //REGISTER USER HANDLE
  //  console.log(req.body.username);
    //res.render('user/dashboard');
//}


exports.addauthor = function (req, res, next)
{
	res.render('books/authorprofile');
}

