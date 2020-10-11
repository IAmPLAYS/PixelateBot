const discord = require('discord.js');

module.exports = {
	name: 'bad',
	description: 'Put your avatar in heaven.',
	run(client, message, args){
		let member = message.mentions.users.first() || message.author;

		let avatar = member.displayAvatarURL();

		var embed = new discord.MessageEmbed()
		.setTitle(`${member} is **bad**`)
		.setColor('#FF0000')
		.setImage(`http://api.alexflipnote.dev/bad?image=${avatar}`);
		message.channel.send(embed)
	}
}