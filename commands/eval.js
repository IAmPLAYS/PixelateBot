const discord = require('discord.js');
const { inspect } = require('util');
const {version} = require('../config.json')
const db = require('quick.db')

module.exports = {
	name: 'eval',
	description: 'evaluate some codes',
	 run(client, message, args,){
		 const prefix = db.get(`user_${message.author.id}_prefix`) || '/'

		let command = args.slice(0).join(' ')

		const owner = [
			'727545540186865754',
			'749896471213637683'
		]
		if(!owner.includes(message.author.id)) return message.channel.send('Sorry, this command is for the developers only!');

		if(!command) return message.channel.send(`****${message.author.username}****, Please add some codes to evaluate!`);

		try{
			const evaled = eval(command)
			var embed = new discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle('Evaluating')
			.addField('Input', `\`\`\`${command}\`\`\``)
			.addField('Output', `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
			.addField('Type Of', `\`\`\`${typeof(evaled)}\`\`\``)
			.setFooter(`${client.user.username} v1.1`, `${client.user.displayAvatarURL()}`);
			message.channel.send(embed);
		} catch(err){
			var errEmbed = new discord.MessageEmbed()
			.setColor('red')
			.setTitle('Terminal')
			.addField('Type Error', `\`\`\`${err}\`\`\``)
			.setFooter(`${client.user.username} ${version}`, `${client.user.displayAvatarURL()}`)
			.setTimestamp()
			message.channel.send(errEmbed);
		}
	}
}