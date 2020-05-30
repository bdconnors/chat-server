const mongoose = require('mongoose');

class Database {
    constructor(config){
        this.url = config.url;
        this.options = {
            conn: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            filter:{}
        };
        if(config.options.conn){this.options.conn = config.options.conn;}
        if(config.options.filter){this.options.filter = config.options.filter;}
        this.messageSchema = new mongoose.Schema({
                id: {type: Number},
                authorId: {type: String},
                message: {type: String},
                createdOn: {type: Date}
            });
        this.messageModel = null;
        this.conn = null;
    }
    async getCount(){
        await this.connect();
        return await this.messageModel.countDocuments();
    }
    async getAll(){
        await this.connect();
        return await this.messageModel.find({},this.options.filter);
    }
    async insert(msg){
        await this.connect();
        const Model = this.messageModel;
        const model = new Model(msg);
        await model.save().catch((e)=>{console.log(e)});
    }
    async connect(){
        if(!this.conn) {
            this.conn = await mongoose.createConnection(this.url, this.options.conn);
            this.messageModel = this.conn.model("message",this.messageSchema);
        }
    }

}
module.exports = Database;