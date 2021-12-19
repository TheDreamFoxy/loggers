const mineflayer = require('mineflayer');
const socketing = require('./server.js');

const options = {
    username: '§§§aLoggers',
    host: 'kaboom.pw',
    version: '1.17'
};

const bot = mineflayer.createBot(options);

bot.on('spawn', () => {
    bot.chat('/c on');
    bot.creative.startFlying();
});

bot.on('playerJoined', () =>{
    socketing.emit('update', 1);
});

bot.on('playerLeft', () =>{
    socketing.emit('update', 1);
});

bot.on('message', message => {
    if(message.json.extra){
        socketing.emit('message', message.extra);
    }else{
        //socketing.emit(message.toString().replace(/</g,'＜').replace(/>/g, '＞'));
    }
    //console.log(message.json.extra);
    //let str = message.toString().replace(/</g,'＜').replace(/>/g, '＞');

    if(message.toString().includes('Your voice has been silenced!') || message.toString().includes('You have been muted!')){
        bot.chat('/mute '+bot.username.replace(/§/g, '')+' 0s');
    };
});

bot.on('error', e => {
    console.log(e);
});

bot.on('kick', r => {
    console.log(r);
});

module.exports.options = options
module.exports.client = bot