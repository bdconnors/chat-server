const Message = require('./Message');
const io = require('socket.io');
const http = require('http');

class Server{
    constructor(db,port){
        this.port = port;
        this.db = db;
        this.http = null;
        this.io = null;
        this.connections = {};
    }
    async init() {
        await this.db.connect();
        this.http = http.createServer().listen(this.port);
        this.io = io(this.http);
        this.io.on("connection",this.connection.bind(this));
    }
    async connection(socket){
        const msgs = await this.db.getAll();
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
        socket.emit("load",msgs);
    }

}
module.exports = Server;