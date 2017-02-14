var ArticleModel = require('../models/ArticleModel');

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
			info:collection
		});
		
	})
	
}