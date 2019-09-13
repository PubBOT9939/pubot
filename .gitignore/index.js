const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = ("p;")


client.on('message', (message) => {

	if(message.content === "bonjour") {
		message.channel.send("Salut! ")
	}

	if(message.content === prefix + "help"){
		message.channel.send("Veux-tu de l'aide?")
	}
})

client.on('ready', () => {
	bot.user.setActivity(`${prefix}help`, {type: "WATCHING"});
})
client.login("NjIxMzM4NzQ5NTU2NDkwMjYw.XXj7ow.hCfsF32DEb5XQLqhIX9e6AdGJ5s")
