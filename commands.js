module.exports = {
	'help': {
		aliases: ['h', 'commands', 'command-list', 'commandlist'],
		description: 'Show the list of commands of the bot',
		format: 'help [command name]'
	},
	'ping': {
		description: 'Show the bot\s ping',
		format: 'ping'
	},
	'say': {
		description: 'repeat the messages, said by the user who execute the command.',
		format: 'say <messages>'
	},
	'ascii': {
		aliases: ['asc', 'asci'],
		description: 'make an ascii text like [this](https://media.discordapp.net/attachments/703313316583440384/764008353788985364/unknown.png)',
		format: 'ascii < message >'
	},
	'botinfo': {
		aliases: ['bi', 'bot-info', 'info'],
		description: 'Get the bot\'s information',
		format: 'botinfo'
	}
}