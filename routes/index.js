var express = require('express');
const multer = require('multer'); 
var router = express.Router();
const multerConfig = require('../codeinclude/images-code');

var bookControllers = require("../controllers/bookControllers")
//const csrf = require("../app");

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', bookControllers.index);
router.post('/addbooks', multer(multerConfig).single('image'), bookControllers.addbooks);
router.get('/addbooks/:id/:book_url', bookControllers.vieweachbook);
//router.get('/addbooks/:id/edit', bookControllers.edit);
router.get("/:id/edit", bookControllers.edit);
router.get('/:id/delete', bookControllers.delete);
router.put("/:id/update", multer(multerConfig).single('image'), bookControllers.update);
//router.post('/registeruser', bookControllers.registeruser); 

module.exports = router;
