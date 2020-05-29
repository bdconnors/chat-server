const Server = require('../index');
Server.start(process.argv.slice(2)[0]).catch((e)=>{throw e});