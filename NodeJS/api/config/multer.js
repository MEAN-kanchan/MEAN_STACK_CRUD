var multer  = require('multer')
var path = require('path')
var fs = require('fs')

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.resolve('uploads', 'images'))
		},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})
var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.fieldname == 'image') {
			req.imageFormat = true;
			var ext = path.extname(file.originalname);
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				req.imageFormat = false;
				cb(null, req)
			} else { cb(null, req); }
        } 
	}
})
module.exports.uploadImage = (req, res, next) => {
	upload.single('image')(req, res, next);
}
