const discord = require('discord.js');
const canva = require('canvacord')

module.exports = {
	name: 'trigger',
	description: 'Comment something on ph',
	async run(client, message, args){

		let member = message.mentions.users.first() || message.author;

		let avatar = member.displayAvatarURL({ format: 'png' });

		let trigger = await canva.Canvas.trigger(avatar);

		var atch = new discord.MessageAttachment(trigger, 'triggered.gif');
		message.channel.send(atch)
		
	}
}