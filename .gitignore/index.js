const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')


var prefix = ("p;")

const warns = JSON.parse(fs.readFileSync('./warns.json'))

// Bienvenue
client.on('guildMemberAdd', member => {
	let gma_embed = new Discord.RichEmbed()
		.setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
		.setFooter('Nous sommes désormais ' + member.guild.memberCount)
	let bvnchannel = member.guild.channels.get('622691907012788244')
	// bvnchannel.send(embed)
	member.addRole('622352397876068391')
})
// Au revoir
client.on('guildMemberRemove', member => {
	let gma_embed = new Discord.RichEmbed()
		.setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
		.setFooter('Nous sommes désormais ' + member.guild.memberCount)
	let byechannel =member.guild.channels.get('622691743044730880')
	// byechannel.send(embed)
	member.addRole('622352397876068391')
})

// Kick
client.on('message', message => {
	if(!message.guild) return
	let args = message.content.trim().split(/ +/g)

	if(args[0].toLowerCase() === prefix + "kick"){

	message.delete() 

		if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande** :cry:").then(m=>m.delete(10000))
		let member = message.mentions.members.first()
		if(!member) return message.channel.send(':x: **Merci de mentionner un utilisateur à kick** :x:').then(m2=>m2.delete(10000))
		if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id === message.guild.owner.id) return message.channel.send(':x: **Vous ne pouvez pas kick cet utilisateur** :x:')
		if(!member.kickable) return message.channel.send(':x: **Je ne peut pas kick cet utilisateur** :x:')
		member.kick()
		message.channel.send('✅ ' + member.user.username + " **a été kick !** ✅")
	}
});

// Ban 1 mois
client.on('message', message => {
	if(!message.guild) return
	let args = message.content.trim().split(/ +/g)

	if(args[0].toLowerCase() === prefix + "ban1m"){

	message.delete()

		if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande** :cry:").then(m=>m.delete(10000))
		let member = message.mentions.members.first()
		if(!member) return message.channel.send(':x: **Merci de mentionner un utilisateur à ban** :x:').then(m2=>m2.delete(10000))
		if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id === message.guild.owner.id) return message.channel.send(':x: **Vous ne pouvez pas ban cet utilisateur** :x:')
		if(!member.bannable) return message.channel.send(':x: **Je ne peut pas bannir cet utilisateur** :x:')
		message.guild.ban(member, {days: 31})
		message.channel.send('✅ ' + member.user.username + " **a été banni 1 mois !** ✅")
	}
});

// Ban 1 an
client.on('message', message => {
	if(!message.guild) return
	let args = message.content.trim().split(/ +/g)

	if(args[0].toLowerCase() === prefix + "ban1y"){

	message.delete()

		if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande** :cry:").then(m=>m.delete(10000))
		let member = message.mentions.members.first()
		if(!member) return message.channel.send(':x: **Merci de mentionner un utilisateur à ban** :x:').then(m2=>m2.delete(10000))
		if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id === message.guild.owner.id) return message.channel.send(':x: **Vous ne pouvez pas ban cet utilisateur** :x:')
		if(!member.bannable) return message.channel.send(':x: **Je ne peut pas bannir cet utilisateur** :x:')
		message.guild.ban(member, {days: 365})
		message.channel.send('✅ ' + member.user.username + " **a été banni 1 an !** ✅")
	}
});

client.on('message', message => {

   if (!message.guild) return
   let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(count + 1, true)
    }
});

// MUTE | UNMUTE | WARNS | WARN | UNWARN | USER INFO |BOT INFO | SERVER INFO | INVITE | PUB
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    //Muted
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }

	if(args[0].toLowerCase() === prefix + "unmute"){
	    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
	    let member = message.mentions.members.first()
	    if(!member) return message.channel.send("Membre introuvable")
	    if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
	    if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
	    let muterole = message.guild.roles.find(role => role.name === 'Muted')
	    if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
	    message.channel.send(member + ' a été unmute :white_check_mark:')
	}

	if (args[0].toLowerCase() === prefix + "warns") {
	    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
	    let member = message.mentions.members.first()
	    if (!member) return message.channel.send("Veuillez mentionner un membre")
	    let embed = new Discord.RichEmbed()
	        .setAuthor(member.user.username, member.user.displayAvatarURL)
	        .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
	        .setTimestamp()
	    message.channel.send(embed)
	}

	if (args[0].toLowerCase() === prefix + "warn") {
	    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
	    let member = message.mentions.members.first()
	    if (!member) return message.channel.send("Veuillez mentionner un membre")
	    if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
	    let reason = args.slice(2).join(' ')
	    if (!reason) return message.channel.send("Veuillez indiquer une raison")
	    if (!warns[member.id]) {
	        warns[member.id] = []
	    }
	    warns[member.id].unshift({
	        reason: reason,
	        date: Date.now(),
	        mod: message.author.username
	    })
	    member.send(':warning: **Vous avez été warn sur** **__' + message.guild.name + "__** **pour :** **" + reason + "** :warning:")
	    fs.writeFileSync('./warns.json', JSON.stringify(warns))
	    message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
	}

	if(args[0].toLowerCase() === prefix + "unwarn"){
	    let member = message.mentions.members.first()
	    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
	    if(!member) return message.channel.send("Membre introuvable")
	    if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
	    if(!warns[member.id]|| !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
	    warns[member.id].shift()
	    fs.writeFileSync('./warns.json',JSON.stringify(warns))
	    message.channel.send("Le dernier warn de " +member+ " a été retiré :white_check_mark:")
    }

    if(args[0].toLowerCase() === prefix + "invite"){
    	var inviteEmbed = new Discord.RichEmbed()
		.setTimestamp()
		.setColor("#15f153")
		.addField("Tu souhaites m'inviter sur ton serveur ?", "[Clique ici !](https://discordapp.com/oauth2/authorize?client_id=621338749556490260&scope=bot&permissions=8)")

		console.log("Lien d'invitation généré !")

		message.delete().catch(O_o=>{});
		message.channel.send(inviteEmbed).then(message => {
			message.delete(15000)
		})
    }

    if(args[0].toLowerCase() === prefix + "userinfo"){

    	let uEmbed = new Discord.RichEmbed()
		.setColor('#4c92f5')
		.setTitle("User Info")
		.setThumbnail(message.author.displayAvatarURL)
		.setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
		.addField("**Username:**", `${message.author.username}`, true)
		.addField("**ID:**", `${message.author.id}`, true)
		.addField("**Discriminator:**", `${message.author.discriminator}`, true)
		.addField("**Status:**", `${message.author.presence.status}`, true)
		.addField("**Created At:**", `${message.author.createdAt}`, true)
		.addField("**Ajouter le bot**", "[Clique ici !](https://discordapp.com/oauth2/authorize?client_id=621338749556490260&scope=bot&permissions=8)")
		.setFooter(`By ${client.user.username}`, client.user.displayAvatarURL);
		message.channel.send('UserInfo envoyés en MP !').then(m=>m.delete(5000))
		message.author.send(uEmbed);

    }

    if(args[0].toLowerCase() === prefix + "botinfo"){

	    let botinfo_embed = new Discord.RichEmbed()
		.setColor("#15f153")
		.setTitle('Bot Info')
		.setThumbnail(client.user.displayAvatarURL)
		.setAuthor(`${client.user.username} Info`, client.user.displayAvatarURL)
		.addField('**Username**', client.user.username, true)
		.addField('**ID**', client.user.id, true)
		.addField('**Discriminator**', client.user.discriminator, true)
		.addField('**Status**', client.user.presence.status, true)
		.addField('**Created By**', "WiiZ#9939", true)
		.addField('**Created At**', client.user.createdAt, true)
		.addField("**Ajouter le bot**", "[Clique ici !](https://discordapp.com/oauth2/authorize?client_id=621338749556490260&scope=bot&permissions=8)")
		.setFooter(`By ${client.user.username}`, client.user.displayAvatarURL)
		message.channel.send('BotInfo envoyés en MP !').then(m=>m.delete(5000))
		message.author.send(botinfo_embed);

    }

    if(args[0].toLowerCase() === prefix + 'serverinfo'){

    	let sEmbed = new Discord.RichEmbed()
		.setColor('#09e82b')
		.setTitle("Server Info")
		.setThumbnail(message.guild.iconURL)
		.setAuthor(`${message.guild.name}`, message.guild.iconURL)
		.addField("**Guild Name:**", `${message.guild.name}`, true)
		.addField("**Guild Owner:**", `${message.guild.owner}`, true)
		.addField("**Member Count:**", `${message.guild.memberCount}`, true)
		.addField("**Role Count:**", `${message.guild.roles.size}`, true)
		.addField("**Ajouter le bot**", "[Clique ici !](https://discordapp.com/oauth2/authorize?client_id=621338749556490260&scope=bot&permissions=8)")
		.setFooter(`By ${client.user.username}`, client.user.displayAvatarURL);
		message.channel.send('ServerInfo envoyés en MP !').then(m=>m.delete(5000))
		message.author.send(sEmbed);

    }

    if(args[0].toLowerCase() === prefix + "pub"){
    	let xoargs = message.content.split(" ").slice(1);
    	let xo03 = xoargs.join(" ")
    	var xo02 = message.guild.channels.find('name', "pupub")
    	if(!xo02) return message.reply(" Channel ``pupub`` introuvable.")
    	if(message.channel.name !== 'pupub') return message.reply(' Commande à effectuer dans ``pupub``')
    	if(!xo03) return message.reply(" Merci d'écrire une pub à envoyer")
	    	var embedpub_global = new Discord.RichEmbed()
	    	.setColor("0x8BCC14")
	    	.setTitle("Pub Globale")
	    	.addField("Pub De :", message.author.username)
	    	.setDescription(xo03)
	    	.setTimestamp()
    	client.channels.findAll('name', "pupub").forEach(channel => channel.send(embedpub_global))	
    }

    // if(args[0].toLowerCase === prefix + "sondage"){
    // 	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Vous ne pouvez pas effectuer de sondage').then(m=>m.delete(7000))

    // 	if(message.member.hasPermission('MANAGE_MESSAGES')){
    // 		let args = message.content.split(" ").slice(1);
    // 		let thingToEcho = args.join(" ")
    // 		var embed = new Discord.RichEmbed()
    // 			.setDescription("Sondage")
    // 			.addField(thingToEcho, "Répondre avec ✅ ou ❌")
    // 			.setColor("0xB40404")
    // 			.setTimestamp()
    // 		message.channel.sendEmbed(embed)
    // 		.then(function (message) {
    // 			message.react('✅')
    // 			message.react('❌')
    // 		}).catch(function() {
    // 		});
    // 	} else {
    // 		return message.reply(" Tu n'as pas la permission d'effectuer des sondages").then(m=>m.delete(10000))
    // 	}
    // }
});

// SAY | ANNONCE | EMBED
client.on('message', message => {

	if(message.author.bot) return;
	if(!message.guild) return;
	if(!message.content.startsWith(prefix)) return;

	const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if(cmd === "say") {
		if(message.deletable) message.delete();

		if(args.length < 1) return message.reply(" Rien à dire?").then(m=>m.delete(5000));

		message.channel.send(args.join(" "));

	}

	if(cmd === "annonce"){
		if(args.length < 1) return message.reply(" Rien à dire?").then(m=>m.delete(5000))
		const annonce = new Discord.RichEmbed()
			.setColor(roleColor)
			.addField("Annonce", args.slice(0).join(" "))
			.setTimestamp()
		message.channel.send(annonce);
	}

	if(cmd === "embed"){
		if(message.deletable) message.delete();

		if(args.length < 1) return message.reply(" Rien à dire ?").then(m=>m.delete(5000))
		const embed = new Discord.RichEmbed()
			.setColor(roleColor)
			.addField("Message", args.slice(0).join(" "))
			.setTimestamp()
		message.channel.send(embed);
	}
});

// SERVER LIST
client.on('message', message => {

	const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

	if(message.content === prefix + "serverlist"){
		let bicon = client.user.displayAvatarURL;
		let string = '';
		client.guilds.forEach(guild => {
			string += guild.name + '\n';})
			let bun = client.user.username;
			let serverlist_embed = new Discord.RichEmbed()
				.setColor(roleColor)
				.addField("Mes Serveurs", string)
				.setTimestamp()
				.setFooter("Commande Demandée par: " + message.author.username, message.author.displayAvatarURL)
			message.channel.send(serverlist_embed)
			}
});

// help
client.on('message', message => {
	if(!message.guild) return

	if(message.content === prefix + "help"){

	message.delete()

		let info_embed = new Discord.RichEmbed()
		.setColor('#04c2db')
		.addField("Informations de Pu'Bot", "p;help\n**Affiche les commandes de Pu'Bot**\n\np;botinfo\n**Affiche les informations de Pu'Bot**\n\np;userinfo\n**Affiche tes informations**\n\np;serverinfo\n**Affiche les informations du serveur sur lequel tu te trouves**\n\np;say\n**Permet de faire dire quelque chose au bot**\n\np;annonce\n**Permet de créer une annonce sous forme d'embed**\n\np;embed\n**Permet de faire un message sous forme d'embed**\n\np;serverlist\n**Permet de voir touts les serveurs où est le bot**")
		.setFooter("Pu'Bot By WiiZ#9939")
		.setTimestamp()

		let mod_embed = new Discord.RichEmbed()
		.setColor('#ff0000')
		.addField("Modération de Pu'Bot", "p;clear\n**Permet de clear un nombre de message définit sur le serveur**\n\np;mute\n**Permet de mute un membre du serveur**\n\np;unmute\n**Permet d'unmute un membre du serveur**\n\np;warn\n**Permet de Warn un membre du serveur**\n\np;unwarn\n**Permet de supprimer le dernier warn d'un membre**\n\np;warns\n**Permet de voir les warns d'un membre**\n\np;kick\n**Permet de kick un membre du serveur**\n\np;ban1m\n**Permet de bannir un membre du serveur pendant 1 mois**\n\np;ban1y\n**Permet de bannir un membre du serveur pendant 1 an**")
		.addField("Ajouter le bot", "[Clique ici !](https://discordapp.com/oauth2/authorize?client_id=621338749556490260&scope=bot&permissions=8)")
		.setFooter("Pu'Bot By WiiZ#9939")
		.setTimestamp()
		message.channel.send('Commandes envoyés en MP !').then(m=>m.delete(5000))
		message.author.send(info_embed).then(ie=> {
			message.author.send(mod_embed)
		})
	}
});


client.on('ready', () => {
	client.user.setActivity("p;help | Pu'Bot");
	console.log("bot on!")
})

client.login(process.env.TOKEN)
