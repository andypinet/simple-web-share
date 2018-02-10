var fs = require("fs");

module.exports = function (app, port) {
    // var privateKey = fs.readFileSync('./ssl/key.pem', 'utf8');
    // var certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
    // var credentials = {key: privateKey, cert: certificate};
    // var httpsServer = require('https').createServer(credentials, app);

    var httpsServer = require('http').createServer(app);
    httpsServer.listen(port, function(){
        console.log(`server started on port: ${port}.`)
    });
    return httpsServer;
};