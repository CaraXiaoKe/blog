const mongoose = require('./db'),
      Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    post_title: String,
    post_classify_sup:Number,
    post_classify_sub:Number,
    post_content:{}
});

const ArticleModel = mongoose.model('Article', ArticleSchema);

class Article {
    constructor() {

    }
    save(condition,callback){
    	new ArticleModel(condition).save(function(err,collection){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collection);
    	})
    }
    find(condition,callback){
    	ArticleModel.find(condition||{},function(err,collections){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collections);
    	})
    }
    findById(id,callback){
    	ArticleModel.findById(id,function(err,collection){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collection);
    	})
    }
}

module.exports = new Article();
