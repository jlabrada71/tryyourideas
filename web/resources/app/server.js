var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

//setting middleware
app.use(express.static('resources.tryyourideas.com/uploads'), (_, res, next) => {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
})

app.get('/', (req, res) => {
    res.send('Hello World!' +  process.cwd());
});

var server = app.listen(3400);
