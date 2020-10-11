const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'get the info of the server',
	aliases: ['si', 's-i', 'server-info'],
	run(client, message, args){
		var embed = new MessageEmbed()
		.setTitle('<:info:762264995458318356> Server Information <:info:762264995458318356>')
		.setColor('orange')
	}
}