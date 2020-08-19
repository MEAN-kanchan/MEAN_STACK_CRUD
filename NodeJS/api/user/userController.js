const Constants = require('./userConstants');
var Employee = require('./user');
const resHndlr = require("../global/responder");
var mongoose = require('mongoose');
var async = require("async");
var path = require("path")
var fs = require("fs")

mongoose.Promise = global.Promise;

module.exports = {//Start

  'userCreate':  (req, res) => { 
        if (!req.body.email) {
      return resHndlr.apiResponder(req, res, Constants.MESSAGES.RequiredField, 500);

    } else {
      if(!req.body._id){
        Employee.findOne({'email':req.body.email},(err,data)=>{
            if(err)  return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
          else if(data) return resHndlr.apiResponder(req,res,'Email is already exist!',404)
          else {
            let name = req.body.email.split('.')
            let filename = name[0]+'.png' ;
            fs.rename(path.resolve('uploads', 'images', req.file.filename), 
            path.resolve('uploads', 'images', filename + path.extname(req.file.originalname)),
                (err) => {
                    if (err) console.log('ERROR: ' + err);
                })
             let detail = {
              'email': req.body.email,
              'first_name':req.body.first_name,
              'last_name':req.body.last_name,
              'mobile':req.body.mobile,
              'img':filename || ''
            }
            Employee.create(detail)
              .then((enteruser) => {
                return resHndlr.apiResponder(req, res, "Create User Successfully", 200, enteruser)
              })
              .catch((error) => {
                return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
              })
  
          }
        })
      }else{
          // let filename = req.body.email ;
          // fs.rename(path.resolve('uploads', 'images', req.file.filename), 
          // path.resolve('uploads', 'images', filename + path.extname(req.file.originalname)),
          //     (err) => {
          //         if (err) console.log('ERROR: ' + err);
          //      })
          let detail = {
            'email': req.body.email,
            'first_name':req.body.first_name,
            'last_name':req.body.last_name,
            'mobile':req.body.mobile
          }
              Employee.findOneAndUpdate({'_id':req.body._id},{$set:detail},{new:true})
                .then((enteruser) => {
                  return resHndlr.apiResponder(req, res, "Update User Successfully", 200, enteruser)
                })
                .catch((error) => {
                  return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
                }) 

        }

    }
  },
  'userFindAll': async (req, res) => {
    Employee.find({})
    .then((result)=>{
      return resHndlr.apiResponder(req, res, "User List", 200, result)
    })
    .catch((error)=>{
      return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
    })

  },
'singleUser':async(req,res)=>{
  if(!req.params._id){
    return resHndlr.apiResponder(req, res, Constants.MESSAGES.RequiredField, 500);
  }else{
    Employee.findOne({'_id':req.params._id})
.then((result)=>{
    return resHndlr.apiResponder(req, res, "Single user", 200, result)
})
.catch((error)=>{
  return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
})
  }

},
'deleteUser':async(req,res)=>{
  if(!req.params._id){
    return resHndlr.apiResponder(req, res, Constants.MESSAGES.RequiredField, 500);
  }else{
  Employee.deleteOne({'_id':req.params._id})
  .then((result)=>{
    return resHndlr.apiResponder(req, res, "Delete user", 200)
  })
  .catch((error)=>{
    return resHndlr.apiResponder(req, res, Constants.MESSAGES.SomeThingWrong, 400)
  })
}
  },


}//End
