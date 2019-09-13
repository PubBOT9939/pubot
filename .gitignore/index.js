const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = ("p;")


client.on('message', (message) => {

	if(message.content === "bonjour") {
		message.channel.send("Salut! ")
	}

	if(message.content === prefix + "help"){
		var help_embed = new Discord.RichEmbed()
		.setColor("#1594c2")
		.setAuthor(`${message.author.username}`)
		.addField("Commandes Du Bot", "**p;help**\nAffiche les commandes\n**p;pub**\nFait ta pub sur tout les serveurs ayant Pu'Bot!")
		.setFooter(`Pu'Bot`, client.user.displayAvatarURL)
		.setTimestamp()
		message.channel.send(help_embed)
	}

	if(message.content === prefix + "pub"){
		
			message.delete()

				let globalargs = message.content.split(" ").slice(1);
				let global3 = globalargs.join(" ")
				var global2 = message.guild.channels.find('name', 'pupub-inter');
				if(!global2) return message.channel.send("Channel `pupub-inter` introuvable !")
				if(message.channel.name !== 'pupub-inter') return message.channel.send("Commande à effectuer dans `pupub-inter`.")
				if(!global3) return message.channel.send("Merci d'écrire une pub à envoyer !")
				var embedglobal = new Discord.RichEmbed()
				.setColor("#1594c2")
				.setAuthor(`${message.author.username}` + '#' + `${message.author.discriminator}`)
				.addField('Serveur Discord', message.guild.name, true)
				.addField('Message', global3)
				.setFooter(`Pu'Bot`, client.user.displayAvatarURL)
				.setTimestamp()
				client.channels.findAll('name', "Pu'client").map(channel => channel.send(embedglobal))

	}
})

client.on('ready', () => {
	client.user.setActivity("p;help | Pu'Bot");
})
client.login("NjIxMzM4NzQ5NTU2NDkwMjYw.XXvYGw.G6qhnwRO6eIRCegJru1uB1A8sus")
