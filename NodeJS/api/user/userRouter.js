const usrRoutr = require("express").Router();
var userController = require('../user/userController');
const resHndlr = require("../global/responder");
const imagUpload = require('../config/multer')



usrRoutr.route("/userCreate")
.post(imagUpload.uploadImage, function(req,res){
userController.userCreate(req,res);	
})

usrRoutr.route("/userFindAll")
.get([], function(req,res){
		userController.userFindAll(req,res);	
})
usrRoutr.route("/singleUser/:_id")
.get([], function(req,res){
	userController.singleUser(req,res);	
})
usrRoutr.route("/deleteUser/:_id")
.delete([], function(req,res){
	userController.deleteUser(req,res);	
})

module.exports = usrRoutr
