var settings = require('../config/settings');
var qiniu = require("qiniu");
var checkLogin = require('../middlewares/checklogin.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

qiniu.conf.ACCESS_KEY = settings.ACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.SECRET_KEY;

var bucket = settings.BUCKET;

function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	return putPolicy.token();
}
function toRandomName(filename){
    var arr = filename.split('.');
    var suffix = '.'+arr[arr.length-1];
    var randomStr= +new Date();
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for(var n=0;n<5;n++){
        var num = Math.floor(Math.random()*36);
        randomStr += str[num];
    };
    return randomStr+suffix;
}
var putFile = function(req,res){
	var filePath = req.files.file.path;//获取文件本地路径
	gm(filePath).crop(
		req.body.toCropImgW, 
		req.body.toCropImgH, 
		req.body.toCropImgX, 
		req.body.toCropImgY
	).autoOrient().write(filePath,function(err){
		var filename = toRandomName(req.files.file.originalFilename);//获取文件原名
		var token = uptoken(bucket, filename );//转化token
		var extra = new qiniu.io.PutExtra();
	    qiniu.io.putFile(token, filename, filePath, extra, function(err, ret) {
	        fs.unlinkSync(filePath);
	      	if(!err) {
	      		console.log(ret);
	        	// 上传成功， 处理返回值
	        	res.send({
	        		status:1,
	        		hash:ret.hash,
	        		key:ret.key,

	        		url:settings.ROOTPATH+ret.key
	        	});       
	     	} else {
	        	// 上传失败， 处理返回代码
	        	res.send({
	        		status:0,
	        		err:err
	        	});
	      	}
		});
	});
}
module.exports = [checkLogin,putFile];