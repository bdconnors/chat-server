const mongoose = require('mongoose');

module.exports = {
    db: {
        url:"mongodb://localhost:27017/chat",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        schema: {
            message: new mongoose.Schema({
                id: {type: Number},
                authorId: {type: String},
                message: {type: String},
                createdOn: {type: Date}
            })
        }
    }
};