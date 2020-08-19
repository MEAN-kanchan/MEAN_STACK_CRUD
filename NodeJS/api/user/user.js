var mongoose = require('mongoose');

const Schema = mongoose.Schema;
var employeeSchema = mongoose.Schema({

	first_name:{type:String},
	last_name:{type:String},
	email:{type:String,unique:true},
	mobile:{type:String},
	img:{type:String}
},{strict:false})
	


module.exports = mongoose.model('Employee',employeeSchema);

