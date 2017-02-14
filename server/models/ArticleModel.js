const mongoose = require('./db'),
      Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    post_title: String,
    post_classify_sup:Number,
    post_classify_sub:Number,
    post_content:{},
    post_thumbnail:{},
    post_created: { type: Number, default: Date.now },
});

const ArticleModel = mongoose.model('Article', ArticleSchema);
const BaseModel = require('./BaseModel');
class Article extends BaseModel {
    constructor() {
        super(ArticleModel)
    }
}

module.exports = new Article();
