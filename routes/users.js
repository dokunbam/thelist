var express = require('express');
var router = express.Router();
var usersControllers = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/dashboard', usersControllers.index); 
router.get('/register', usersControllers.register); 
router.get('/login', usersControllers.login); 
router.post('/register', usersControllers.registeruser); 
  

module.exports = router;
