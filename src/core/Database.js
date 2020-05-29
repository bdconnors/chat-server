const mongoose = require('mongoose');

class Database {
    constructor(config){
        this.config = config;
        this.conn = null;
        this.messageModel = null;
    }
    async getCount(){
        await this.connect();
        return await this.messageModel.countDocuments();
    }
    async getAll(){
        await this.connect();
        return await this.messageModel.find({},{ '_id': 0,'__v':0});
    }
    async insert(msg){
        await this.connect();
        const Model = this.messageModel;
        const model = new Model(msg);
        await model.save().catch((e)=>{console.log(e)});
    }
    async connect(){
        if(!this.conn) {
            this.conn = await mongoose.createConnection(this.config.url, this.config.options);
            this.messageModel = this.conn.model("message",this.config.schema.message);
        }
    }

}
module.exports = Database;