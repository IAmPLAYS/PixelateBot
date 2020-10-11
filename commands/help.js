const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'help',
	description: 'get the list of commands of the bot.',
	aliases: ['h', 'halp', 'help', 'hilp', 'holp', 'hulp'],
	category: 'Utiity',
	async run(client, message, args){
		const prefix = db.get(`user_${message.author.id}_prefix`) || '/';

		var embed = new MessageEmbed()
		.setTitle('Help!')
		.setURL('http://pixelatebot.gq/commands')
		.setDescription(`add "\`${prefix}\`" before the commands`)
		.addField('Utiity', '`help, suggest, ping, myprefix, vote`', true)
		.addField('Fun', '`topic, tod, ascii`', true)
		.addField('Infos', '`info, userinfo, avatar`', true)
		.addField('<:economy:762178365921689662> Economy', '`addcoins, daily, removecoins`', true)
		.addField('Image', '`wide, heaven, grave, trigger`', true)
		.setFooter(`${client.user.username} v1`, `${client.user.displayAvatarURL({dynamic: true})}`)
		.setTimestamp();
		message.channel.send(embed)
	}
}