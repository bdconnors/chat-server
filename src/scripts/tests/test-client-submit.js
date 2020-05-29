const Server = require('../../index');
const Client = require('../../core').Client;

const args = process.argv.slice(2);

let client;

function printResult(data) {
    console.log('socket event: ');
    console.log(data);
}

Server.start(args[1]).then(()=>{
    client = new Client(`http://${args[0]}:${args[1]}`,printResult);
    client.connect();
    console.log('client connected');
    client.submit("Testing Message Submission");
}).catch((e)=>{
    throw e;
});