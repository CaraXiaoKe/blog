var express = require('express');
var router = express.Router();
var AdminModel = require('../models/AdminModel');
var crypto=require('crypto');
router.post('/register', function(req, res, next) {
	 var admin = req.body.admin;
	 AdminModel.findOne({admin},function(err,collection){
	 	if(err){
			res.json({
				status:0,
				info:'账号信息查询失败',
				err:err
			});
			return;
		};
	 	if(collection && req.body.isnew){
	 		res.json({
	 			status:0,
	 			info:"用户已存在"
	 		});
	 		return ;
	 	};
	 	var password = req.body.password;
	 	if(password.replace(/\s+/,'')==''){
	 		res.json({
	 			status:0,
	 			info:"密码不能为空！"
	 		});
	 		return ;
	 	};
	 	var md5 = crypto.createHash('md5').update(password).digest('hex');
	 	if(collection && !req.body.isnew){
	 		AdminModel.findByIdAndUpdate(collection._id,{admin:admin,password:md5},function(err,collection){
		 		if(err){
					res.json({
						status:0,
						info:'更新失败',
						err:err
					});
					return;
				};
			 	res.json({
			 		status:1,
			 		info:"更新成功"
			 	})
		 	})
	 		return;
	 	};
	 	AdminModel.save({admin:admin,password:md5},function(err,collection){
	 		if(err){
				res.json({
					status:0,
					info:'保存失败',
					err:err
				});
				return;
			};
		 	res.json({
		 		status:1,
		 		info:"保存成功"
		 	})
	 	})
	 })
});
router.post('/login', function(req, res, next) {
	 var admin = req.body.admin;
	 AdminModel.findOne({admin},function(err,collection){
	 	if(err){
			res.json({
				status:0,
				info:'账号信息查询失败',
				err:err
			});
			return;
		};
	 	if(!collection){
	 		res.json({
	 			status:0,
	 			info:"用户不存在！"
	 		});
	 		return ;
	 	};
	 	var password = req.body.password;
	 	if(password.replace(/\s+/,'')==''){
	 		res.json({
	 			status:0,
	 			info:"密码不能为空！"
	 		});
	 		return ;
	 	};
	 	var md5 = crypto.createHash('md5').update(password).digest('hex');
	 	if(collection.password !== md5){
	 		res.json({
	 			status:0,
	 			info:"密码错误！"
	 		});
	 		return ;
	 	};
	 	req.session.user = admin;
	 	res.json({
 			status:1,
 			info:"登陆成功",
 			admin:admin,
 			token:req.session.id
 		});	
 	})
});
module.exports = router;