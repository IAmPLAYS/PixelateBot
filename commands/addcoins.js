const db = require('quick.db')
const discord = require('discord.js')

module.exports = {
	name: 'addcoins',
	description: 'Add some coins to the mention\'s user',
	aliases: ['am', 'a-m'],
	cooldown: 5,
	run(client, message, args){
		if(message.author.id !== '749896471213637683') return message.channel.send('Sorry but this command for the develolper only!')

		const profiles = new db.table(`profiles`)

		const member = message.mentions.users.first() || message.author;

		if(!args[0]) return message.channel.send('You need to specify the amount of coins you want to give!')

		if(isNaN(args[0]) || args[0] <= 0) return message.channel.send('The given amount is not a number. Make sure to add a user an coins the amount of coins is above "0"')

		profiles.add(`profiles_${member.id}.coins`, args[0])

		return message.channel.send(`<:addCoin:761951668950269993> the user ${member} has been added ${args[0].toLocaleString()}`)
	}
}