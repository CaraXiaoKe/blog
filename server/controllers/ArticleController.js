var ArticleModel = require('../models/ArticleModel');
var dict = require('../config/dict');
var utills = require('../utills/index');
exports.getLists = function(req,res,next){

	ArticleModel.find(req.query,function(err,collections){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:collections
		});
		
	})
	
}

exports.getOneArticle = function(req,res,next){

	ArticleModel.findById(req.params.id,function(err,collection){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:collection
		});
		
	})
	
}

exports.addOne = function(req,res,next){

	ArticleModel.save(req.body,function(err,collection){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:collection
		});
		
	})
	
}

exports.editOne = function(req,res,next){

	ArticleModel.findByIdAndUpdate(req.params.id,req.body,function(err,collection){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:collection,
			session:req.session.id,
			cookie:req.headers.cookie
		});
		
	})
	
}

exports.getArticleTypes = function(req,res,next){
	res.json({
		status:1,
		info:dict.articleTypes
	})
}

exports.getPagination = function(req,res,next){
	ArticleModel.getPagination(req.query,function(err,col){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:col
		})
	})
}

exports.readOne= function(req,res,next){
	ArticleModel.updatePv(req.body.id,function(err,col){
		if(err){
			res.json({
				status:0,
				info:err
			});
			return;
		};
		res.json({
			status:1,
			info:col
		})
	})
}










