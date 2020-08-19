module.exports={
'apiResponder':(req,res,responseMessage,responseCode,data)=>{
	//console.log("*******************************",data)
		return res.send({'responseCode':responseCode,
			'responseMessage':responseMessage,
			data:data})
	}
}