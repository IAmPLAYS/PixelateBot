const discord = require('discord.js');

module.exports = {
	name: 'grave',
	description: 'Put your avatar into the grave',
	run(client, message, args){
		
		let member = message.mentions.users.first() || message.author;

		let avatar = member.displayAvatarURL();

		var atch = new discord.MessageAttachment(`http://vacefron.nl/api/grave?user=${avatar}`, 'grave.png');
		message.channel.send(atch)

	}
}