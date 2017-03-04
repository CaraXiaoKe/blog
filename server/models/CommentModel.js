const mongoose = require('./db'),
      Schema = mongoose.Schema;

const CommentSchema = new Schema({
    email: String,
    nickname: String,
    content: String,
    article_id: {type:String, index: true},
    created_at: {type: Number, default: Date.now}
});

const CommentModel = mongoose.model('Comment', CommentSchema);
const BaseModel = require('./BaseModel');
class Comment extends BaseModel {
    constructor() {
        super(CommentModel)
    }
}

module.exports = new Comment();
