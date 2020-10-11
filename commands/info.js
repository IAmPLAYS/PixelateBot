var discord = require('discord.js');

module.exports = {
	name: 'info',
	description: 'get the info of the bot',
	aliases: ['info', 'bot', 'botinfo', 'bot-info', 'bi'],
	async run(client, message, args){

		let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		var embed = new discord.MessageEmbed()
		.setTitle('Bot Informations')
		.setAuthor(`${client.user.username}`)
		.addField('<:name:761948055213572106> Name', `[${client.user.tag}](https://discord.com/users/${client.user.id})`, true)
		.addField('<:id:761948054705274901> ID', `${client.user.id}`, true)
		.addField('<:ping:761584890458013696> Bot Latenzy', `${client.ws.ping}ms`, true)
		.addField('<:servers:761948055393271808> Servers', `${client.guilds.cache.size}`, true)
		.addField('<:channels:761945893367709696>Channels', `${client.channels.cache.size}`, true)
		.addField('<:users:761948055460642818> Users', `${client.users.cache.size}`, true)
		.addField('Uptime', `${uptime}`)
		.addField('<:links:761948054512992269> Links', `[<:add:761950849328480267> Invite](http://pixelatebot.gq/invite) | [<:discord:761952458896703498> Server](https://discord.gg/W3pDbjD) | [<:website:761951625573040159> Website](http://bit.ly/pixelatebot)`);
		message.channel.send(embed);
		 
	}
}