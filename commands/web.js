const discord = require('discord.js')
const thum = require('thum.io')

module.exports = {
	name: 'web',
	description: 'Get some example of the website given link',
	run(client, message, args){

		let link = args.slice(0).join(' ')
		if(!link) return message.channel.send('Please give some example links to take an _screenshot_.')

		var thumURL = thum.getThumURL({
  url: `http://${link}`,
  width: 1200,
  auth: {
    type: 'md5',
    secret: process.env.THUM_IO_SECRET,
    keyId: 500,
  },
});

		var embed = new discord.MessageEmbed()
		.setTitle(`${link} Screenshot`)
		.setDescription('It is look\'s like your searching for?')
		.setImage(`${thumURL}`)
		.setFooter(`${client.user.username} v1.2`, `${client.user.displayAvatarURL()}`)
		.setTimestamp();
		message.channel.send(embed)

	}
}