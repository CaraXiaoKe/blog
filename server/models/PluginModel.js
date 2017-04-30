const mongoose = require('./db'),
      Schema = mongoose.Schema;

const PluginSchema = new Schema({
    post_title: String,//文章标题
    post_thumbnail:{},//缩略图名字和网址
    post_created: { type: Number, default: Date.now },//发表日期
    post_html:String,//发表内容
    post_abstract:String,//概述
    post_tag:[],
    post_pv:{type:Number,default:0},//阅读数
    post_user:String
});

const PluginModel = mongoose.model('Plugin', PluginSchema);
const BaseModel = require('./BaseModel');
class Plugin extends BaseModel {
    constructor() {
        super(PluginModel)
    }
}

module.exports = new Plugin();
