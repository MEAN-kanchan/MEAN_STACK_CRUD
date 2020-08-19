var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors =require('cors')
var mongoose  = require('mongoose');
var http = require('http');
mongoose.connect('mongodb://localhost/CRUD_DB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cors({origin:'http://localhost:4200'}))
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, browser_id");
 next();
});
app.get('/a',function(req,res){
	res.send("WELCOME!!!!!!!!!!");
});
// require("./api/user/userRouter")(app); 
require("./api/router")(app);
//var userRouters =  require('./api/user');
console.log('Hello World...!');

app.listen(3000, () => console.log('Example app listening on port 8007!'));
console.log('your server will be started');
