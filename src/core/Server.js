const Message = require('./Message');

class Server{
    constructor(io,db){
        this.db = db;
        this.io = io;
        this.connections = {};
    }
    async init() {
        this.io.on("connection",this.connection.bind(this));
    }
    async connection(socket){
        console.log('new client connection');
        this.connections[socket.id] = socket;
        socket.on("submit",(data)=>{
            this.db.getCount().then((cnt)=>{
                const msgId = cnt + 1;
                const msg = new Message((msgId),socket.id,data);
                this.db.insert(msg).then(()=>{
                    this.db.getAll().then((msgs)=>{
                        socket.emit("load",msgs);
                    });
                }).catch((e)=>{console.log(e);});
            });
        });
        socket.on("disconnect",()=>{
            delete this.connections[socket.id];
        });
    }

}
module.exports = Server;