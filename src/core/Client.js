const io = require('socket.io-client');

class Client{
    constructor(url,print){
        this.url = url;
        this.socket = null;
        this.print = print
    }
    connect(){
        this.socket = io(this.url);
        this.socket.on("connect_failed", () => {
            console.log('connection to chat failed retrying in 1000 ms');
            setTimeout(this.connect.bind(this), 1000);
        });
        this.socket.on("load", this.print);
    }
    submit(data){
        this.socket.emit("submit",data);
    }
}
module.exports = Client;