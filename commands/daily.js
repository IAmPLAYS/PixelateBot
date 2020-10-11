const db = require('quick.db')
const moment = require('moment')

module.exports = {
	name: 'daily',
	description: 'Add some money to your balance daily.',
	aiases: ['d'],
	cooldown: 3,
	run(client, message, args){
		const profiles = new db.table(`profiles`)

		const dailyCooldown = profiles.get(`profiles_${message.author.id}.dailycooldown`)

		if(Date.now() > dailyCooldown || dailyCooldown === undefined) {
			const randomNumber = Math.floor(Math.random() * 2000) + 1
			profiles.add(`profiles_${message.author.id}.money`, randomNumber)
			profiles.set(`profiles_${message.author.id}.dailycooldown`, Date.now() + 86400000)
			return message.channel.send(`
Your have recieved ${randomNumber.toLocaleString()} from your daily reward.
			`)
		} else {
			return message.channel.send(`
****${message.author.username}****, you're in cooldown, please wait ${moment(dailyCooldown).fromNow()} to claim your reward again
			`)
		}
	}
}