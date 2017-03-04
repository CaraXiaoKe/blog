const mongoose = require('./db'),
      Schema = mongoose.Schema;

const AdminSchema = new Schema({
    admin: String,
    password: String,
});

const AdminModel = mongoose.model('User', AdminSchema);
const BaseModel = require('./BaseModel');
class Admin extends BaseModel {
    constructor() {
        super(AdminModel)
    }
}

module.exports = new Admin();
