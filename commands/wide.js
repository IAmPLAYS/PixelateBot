const discord = require('discord.js');

module.exports = {
	name: 'wide',
	description: 'wide someone\'s pictures',
	run(client, message, args){

		let member = message.mentions.users.first() || message.author;

		let avatar = member.displayAvatarURL();

		var atch = new discord.MessageAttachment(`http://vacefron.nl/api/wide?image=${avatar}`, 'wide.png');
		message.channel.send(atch)
	}
}