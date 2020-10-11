const discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'send the avatar of the user',
	run(client, message, args){
		let user = message.mentions.users.first() || message.author;

		let avatar = user.displayAvatarURL();

		var embed = new discord.MessageEmbed()
		.setAuthor(`${user.tag}`, `${avatar}`)
		.setThumbnail(avatar)
		.setTitle(`${user.username}'s avatar`)
		.setDescription(`[Avatar Link](${avatar})`)
		.setImage(avatar)
		.setFooter(`${client.user.username} v1.3`, `${client.user.displayAvatarURL()}`)
		message.channel.send(embed)
	}
}