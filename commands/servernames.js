module.exports = {
	name: 'servers',
	description: 'nothing',
	aliases: [''],
	run(client, message, args){
		message.channel.send(client.guilds.cache.map(guilds => guilds.name))
	}
}