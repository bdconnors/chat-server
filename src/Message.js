class Message{
    constructor(id,authorId,message,createdOn = new Date()){
        this.id = id;
        this.authorId = authorId;
        this.message = message;
        this.createdOn = createdOn;
    }
}
module.exports = Message;