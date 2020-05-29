const http = require('http');
const io = require('socket.io');
const Database = require('./core').Database;
const Server = require('./core').Server;

let db;
let httpServer;
let sockets;
let socketServer;

async function start(port){
    db = new Database(require('./config').db);
    httpServer = http.createServer().listen(port);
    sockets = io(httpServer);
    await db.connect();
    socketServer = new Server(sockets,db);
    socketServer.init().catch((e)=>{throw e});
    console.log(`Socket opened on port ${port}`);
}
module.exports.start = start;