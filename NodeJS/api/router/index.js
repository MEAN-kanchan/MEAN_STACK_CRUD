var express = require('express'),
app = express()
const imagUpload = require('../config/multer')

const responseHandler = require('../global/responder');
var userRouters =  require('../user/userRouter');


module.exports = function(app){
	
	app.use('/user', userRouters);
	app.use(responseHandler.apiResponder);
}