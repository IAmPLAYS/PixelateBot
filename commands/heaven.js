const discord = require('discord.js');

module.exports = {
	name: 'heaven',
	description: 'Put your avatar in heaven.',
	run(client, message, args){
		let member = message.mentions.users.first() || message.author;

		let avatar = member.displayAvatarURL();

		var atch = new discord.MessageAttachment(`http://vacefron.nl/api/heaven?user=${avatar}`, 'heaven.png');
		message.channel.send(atch)
	}
}