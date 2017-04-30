var PluginModel = require('../models/PluginModel');
exports.getLists = function(req,res,next){

	PluginModel.find(req.query,function(err,collections){
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

exports.getOnePlugin = function(req,res,next){

	PluginModel.findById(req.params.id,function(err,collection){
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

	PluginModel.save(req.body,function(err,collection){
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

	PluginModel.findByIdAndUpdate(req.params.id,req.body,function(err,collection){
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


exports.getPagination = function(req,res,next){
	PluginModel.getPagination(req.query,function(err,col){
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
	PluginModel.updatePv(req.body.id,function(err,col){
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










