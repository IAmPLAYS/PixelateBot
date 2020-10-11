const discord = require('discord.js')

module.exports = {
	name: 'vote',
	description: 'VOte the bot from the botlidts',
	run(client, message, args){

		var embed = new discord.MessageEmbed()
		.setTitle('Bot me from DBL\'s')
		.setColor('skyblue')
		.addField('discord-botlist.eu', `[Vote me here](http://discord-botlist.eu/bots/761576107887034388/vote)`, true)
		.setFooter(`${client.user.username} v1.2`, `${client.user.displayAvatarURL()}`)
		.setTimestamp();
		message.channel.send(embed)
	}
}