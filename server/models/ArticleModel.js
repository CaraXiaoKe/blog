const mongoose = require('./db'),
      Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    post_title: String,//文章标题
    post_classify_sup:Number,//一级分类
    post_sup_name:String,
    post_classify_sub:Number,//二级分类
    post_sub_name:String,
    post_thumbnail:{},//缩略图名字和网址
    post_created: { type: Number, default: Date.now },//发表日期
    post_html:String,//发表内容
    post_abstract:String,//概述
    post_pv:{type:Number,default:0},//阅读数
    post_comments:{type:Number,default:0},//评论数
    post_user:String
    
});

const ArticleModel = mongoose.model('Article', ArticleSchema);
const BaseModel = require('./BaseModel');
class Article extends BaseModel {
    constructor() {
        super(ArticleModel)
    }
}

module.exports = new Article();
