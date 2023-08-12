// for dev:
// cp server.js /home/ubuntu/apps/resources.tryyourideas.com
// cd /home/ubuntu/apps
// node resources.tryyourideas.com/server.js &


import express from 'express'
const app = express();

//setting middleware
app.use(express.static('/home/ubuntu/apps/resources.tryyourideas.com/uploads'))

app.get('/', (req, res) => {
    res.send('Hello World!' +  process.cwd());
});

const server = app.listen(3400);