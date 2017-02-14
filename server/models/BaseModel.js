class BaseModel {
	constructor(model){
		this.model = model;
	}
	save(condition,callback){
		let Model = this.model;
    	new Model(condition).save(function(err,collection){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collection);
    	})
    }
    find(condition,callback){
    	this.model.find(condition||{}).sort({ _id: -1}).exec(function(err,collections){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collections);
    	})
    }
    findById(id,callback){
    	this.model.findById(id,function(err,collection){
    		if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collection);
    	})
    }
    findByIdAndUpdate(_id,condition,callback){
        this.model.findByIdAndUpdate(_id, condition, {new: true}, (err, collection) => {
            if(err){
    			console.log(err);
    			callback(err);
    			return;
    		};
    		callback(null,collection);
        });
    }
}
module.exports = BaseModel ;