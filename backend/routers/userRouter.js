const route = require('express').Router();
const userController = require('../controllers/userController');

route.post('/registerUser',userController.registerUser);
route.post('/loginUser',userController.loginUser);

module.exports = route;