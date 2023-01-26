const Router = require('express').Router();


Router.use('/users',require('./userRouter'));


module.exports = Router;