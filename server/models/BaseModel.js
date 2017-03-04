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
    findOne(condition,callback){
        this.model.findOne(condition||{},function(err,collection){
            if(err){
                console.log(err);
                callback(err);
                return;
            };
            callback(null,collection);
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
    updatePv(_id,callback){
        this.model.findByIdAndUpdate(_id,{$inc:{"post_pv":1}}, {new: true}, (err, collection) => {
            if(err){
                console.log(err);
                callback(err);
                return;
            };
            callback(null,collection);
        });
    }
    getPagination(query,callback){
        let conditions = query.conditions||{};
        let sortedBy = query.sortedBy||{};
        let limit = query.limit-0;
        let filterBy = query.filterBy||'';
        let skipNum = query.offset * limit;
        
        this.model.find(conditions).count((err, count)=>{
            if(err){
                console.log(err);
                callback(err);
                return;
            };
            this.model.find(conditions).sort(sortedBy).limit(limit).skip(skipNum).select(filterBy).exec((err,collections)=>{
                if(err){
                    console.log(err);
                    callback(err);
                    return;
                };
                let nodata = false;
                if(count <= query.limit*(query.offset+1)){
                    nodata = true;
                };
                callback(null,{collections,count,nodata})
            })
        })  
    }
}
module.exports = BaseModel ;