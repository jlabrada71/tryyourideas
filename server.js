// for dev:
// cp server.js /home/ubuntu/apps/resources.tryyourideas.com
// cd /home/ubuntu/apps
// node resources.tryyourideas.com/server.js &


var express = require('express');
var app = express();

//setting middleware
app.use(express.static('resources.tryyourideas.com/uploads'))

app.get('/', (req, res) => {
    res.send('Hello World!' +  process.cwd());
});

var server = app.listen(3400);