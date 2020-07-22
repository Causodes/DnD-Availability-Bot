// require the discord.js module
const Discord = require('discord.js');

const config = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) 
        return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if(command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if(command == "role") {
        // Returns a list of members in a role
        let roleName = args[0];
        let membersWithRole = message.guild.members.cache.filter(member => { 
            return member.roles.cache.find(m => m.name === roleName);
        }).map(member => {
            return member.user.username;
        })

        let embed = new Discord.MessageEmbed({
            "title": `Users with the ${roleName} role`,
            "description": membersWithRole.join("\n"),
            "color": 0xFFFF
        });
        
        return message.channel.send({embed}).then(embedMessage => {
            embedMessage.react("👍");
        });
    }

    if(command == "session") {
        // Returns a list of members in a role
        let roleName = 'dnd';
        let membersWithRole = message.guild.members.cache.filter(member => { 
            return member.roles.cache.find(m => m.name === roleName);
        }).map(member => {
            return member.user.username;
        })

        let embed = new Discord.MessageEmbed({
            "title": `Session on ${args.join(" ")}`,
            "description": membersWithRole.join("\n"),
            "color": 0xFFFF
        });
        
        return message.channel.send({embed}).then(embedMessage => {
            embedMessage.react("👍");
        });
    }

});

// login to Discord with your app's token
client.login(config.token);