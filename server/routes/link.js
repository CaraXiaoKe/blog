var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/ArticleModel');
var dict = require('../config/dict');
function extendConditions(obj){
	var o = {
		limit     : 6,
        offset    : 0,
        sortedBy  : {
        	_id:-1
        }
	};
	if(obj){
		o.conditions = obj
	}
	return o;
};
router.get('/', function(req, res, next) {
	var query = extendConditions();

	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端' ,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	
	  	
});
router.get('/cate/:id', function(req, res, next) {
	var query = extendConditions({post_classify_sup:req.params.id});

	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端' ,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('/subcate/:id', function(req, res, next) {
	var query = extendConditions({post_classify_sub:req.params.id});
	
	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端' ,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('/site/serach', function(req, res, next) {
	var query = extendConditions({post_title:new RegExp(req.query.title,'i')});

	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端' ,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('/blog/:id', function(req, res, next) {
	ArticleModel.findById(req.params.id,function(err,collection){
		res.render('article', 
	  		{ 
	  			title: '前端' ,
	  			post: collection,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('*', function(req, res, next) {
	res.render('error', 
  		{ 
  			title: '页面不存在' 
  		}
  	);
});
module.exports = router;