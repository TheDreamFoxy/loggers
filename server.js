const bot = require('./bot.js');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html');
});

//-----------------------------------------------TODO// <= finished (maybe add more??)
app.get('/stats', (req, res) => {
    res.send({
        "host": bot.options.host,
        "players":  Object.keys(bot.client.players).length
    });
});

app.post('/chat', (req, res) => {
    console.log(req.body);
    if(req.body.message && req.body.username){
        bot.client.chat('&7'+req.body.username+' &6>>&7 '+req.body.message);
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    };
});

/*
io.on('connection', socket => {
    console.log(socket);
});*/

function emit(event, data){
    io.emit(event, data);
};

http.listen(3001, function() {
    console.log('listening on :3001');
});

module.exports.emit = emit