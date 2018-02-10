var express = require('express');
var app = express();

// 解决跨域问题
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.set('content-type', 'text/plain');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.get("/testapi", function(request, response) {
    // response.send(JSON.stringify({
    //     a: 1
    // }));

    response.status(404)        // HTTP status 404: NotFound
            .send('Not found');
});

app.post("/testapi", function(request, response) {
    response.send(JSON.stringify({
        success: true
    }));
});

app.put("/testapi", function(request, response) {
    response.send(JSON.stringify({
        success: true
    }));
});

app.delete("/testapi", function(request, response) {
    response.send(JSON.stringify({
        success: true
    }));
});

var httpsServer = require("./httpserver")(app, 9700);