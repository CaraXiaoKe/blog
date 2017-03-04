var CommentModel = require('../models/CommentModel');
exports.getLists = function(req,res,next){
	CommentModel.find({article_id:req.query.article_id},function(err,collections){
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
exports.addComment = function(req,res,next){

	CommentModel.save(req.body,function(err,collection){
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













