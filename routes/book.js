var express = require('express');
var router = express.Router();

var bookControllers = require('../controllers/bookControllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a recipe resource');
});

//router.get('/books', bookControllers.index);

//router.post('/addbooks', bookControllers.addbooks);

//router.get('/addauthor', bookControllers.addauthor);

module.exports = router;
