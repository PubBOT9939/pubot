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
	client.user.setActivity("p;help | Pu'Bot");
})
client.login(process.env.TOKEN)
