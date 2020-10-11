const discord = require('discord.js')

module.exports = {
	name: 'topic',
	description: 'get some random topics.',
	async run(client, message, args){

		var topics = [
			'As a child, what did you want to be when you grew up?',
			'Do you play any sports?',
			'Are you a spender or a saver?',
			'What is your favorite holiday?',
			'What is ypur favorite subject?',
			'Do you like cooking?',
			'What are some things you shouldn\'t say at work?',
			'Is it better to work at a job that you love or a job that pays well?',
			'What is the biggest physical challenge that you have faced?',
			'Are you a morning or a night person?',
			'Do you know how to code?'
		]

		var randomTopics = topics[Math.floor(Math.random() * topics.length)]

		message.channel.send(`${randomTopics}`)
	}
}