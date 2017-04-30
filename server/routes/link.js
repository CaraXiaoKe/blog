var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/ArticleModel');
var PluginModel = require('../models/PluginModel');
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
	  			cate_id:-1,
	  			pathUrl:'/home/2',
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	
	  	
});
router.get('/home/:page_id', function(req, res, next) {

	var query = extendConditions({});
	query.offset = req.params.page_id-1;
	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端',
	  			pathUrl:'/home/'+ (req.params.page_id-0+1),
	  			cate_id:-1,
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
	  			title: '前端',
	  			pathUrl:'/cate/'+req.params.id+'/2',
	  			cate_id:req.params.id,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('/cate/:id/:page_id', function(req, res, next) {

	var query = extendConditions({post_classify_sup:req.params.id});
	query.offset = req.params.page_id-1;
	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端',
	  			pathUrl:'/cate/'+req.params.id+'/'+(req.params.page_id-0+1),
	  			cate_id:req.params.id,
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
	  			cate_id:0,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata,
	  			menus:dict.articleTypes
	  		}
	  	);
	})	  	
});
router.get('/subcate/:id/:page_id', function(req, res, next) {

	var query = extendConditions({post_classify_sub:req.params.id});
	query.offset = req.params.page_id-1;
	ArticleModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		res.render('index', 
	  		{ 
	  			title: '前端',
	  			pathUrl:'/subcate/'+req.params.id+'/'+(req.params.page_id-0+1),
	  			cate_id:0,
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
	  			cate_id:-1,
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
router.get('/plugin', function(req, res, next) {
	var query = extendConditions();
	query.limit = 12;
	PluginModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		o.collections = o.collections.map((item)=>{
			item.post_tag = item.post_tag.join(",");
			return item;
		});
		res.render('plugin', 
	  		{ 
	  			title: '优秀的JS插件集合' ,
	  			posts: o.collections,
	  			next:2,
	  			count:o.count,
	  			nodata:o.nodata
	  		}
	  	);
	})	  	
});
router.get('/plugin/:id', function(req, res, next) {
	PluginModel.findById(req.params.id,function(err,collection){
		res.render('plugin-detail', 
	  		{ 
	  			title: '前端' ,
	  			post: collection
	  		}
	  	);
	})	  	
});
router.get('/plugin/p/:page_id', function(req, res, next) {
	var query = extendConditions();
	query.limit =  12;
	var offset = req.params.page_id;
	if(isNaN(offset) || offset < 1 ){
		offset = 1;
	};
	query.offset = Math.floor(offset)-1;
	PluginModel.getPagination(query,function(err,o){
		if(o.collections.length < query.limit){
			o.nodata = true; 
		};
		o.collections = o.collections.map((item)=>{
			item.post_tag = item.post_tag.join(",");
			return item;
		});
		res.render('plugin', 
	  		{ 
	  			title: '优秀的JS插件集合' ,
	  			next:query.offset+2,
	  			posts: o.collections,
	  			count:o.count,
	  			nodata:o.nodata
	  		}
	  	);
	})
		// res.render('plugin', 
	 //  		{ 
	 //  			title: '优秀的JS插件集合' ,
	 //  			post: []
	 //  		}
	 //  	);	  	
});
router.get('*', function(req, res, next) {
	res.render('error', 
  		{ 
  			title: '页面不存在' 
  		}
  	);
});
module.exports = router;