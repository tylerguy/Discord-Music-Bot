const Discord = require('discord.js');
const {
    prefix,
    token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const queue = new Map();

//discord login
const client = new Discord.Client();
client.login(token);

//status messages
client.once( 'ready', () => { console.log('Ready!');});
client.once( 'reconnecting', () => { console.log('Reconnecting!');});
client.once( 'disconnect', () => {console.log ('Disconnect!');});

//read messages
client.on('message', async message => {} )

if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

//check commands
const serverQueue = queue.get(message.guild.id);

if (message.content.startsWith('${prefix}play')) {
    execute(message, serverQueue);
    return;
} else if (message.content.startsWith ('${prefix}skip')) {
    skip(message, serverQueue);
    return;
} else if (message.content.startsWith ('${prefix}stop')) {
    stop (message, serverQueue);
    return;
} else {
    message.channel.send("This command is invalid, try again");
}

async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "You need to join a voice channel before playing music"
            );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "I need CONNECT and SPEAK permissions to join this voice channel"
            );
        }

    }

    //getting song info
    const song
    