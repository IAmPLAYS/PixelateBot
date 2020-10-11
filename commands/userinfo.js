const discord = require('discord.js')

module.exports = {
	name: 'userinfo',
	description: 'Get the inf of the user',
	category: 'Infos',
	aliases: ['ui', 'userinfo'],
	run(client, message, args){
		var member = message.mentions.users.first() || message.author;

		var embed = new discord.MessageEmbed()
		.setAuthor(`${member.tag}`, `${member.displayAvatarURL()}`)
		.setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
		.setTitle('<:info:762264995458318356> User Info <:info:762264995458318356>')
		.setColor('skyblue')
		.addField('<:name:761948055213572106> Name', `[${member.tag}](https://discord.con/users/${member.id})`, true)
		.addField('ID', `${member.id}`, true)
		.addField('Bot', `${member.bot}`, true)
		.addField('status', `${member.presence.status}`, true)
		.setFooter(`Request by: ${message.author.tag} || ${client.user.username} v1.2`, `${message.author.displayAvatarURL()}`);
		message.channel.send(embed)
	}
}