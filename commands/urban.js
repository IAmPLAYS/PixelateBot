const Discord = require('discord.js')
const fetch = require('node-fetch')
const querystring = require('querystring')

module.exports = {
	name: 'urban',
	description: 'sedd some urban definition from urban dctionary',
	aliases: ['urban', 'urban-disctionary', 'urbandictionary', 'ud'],
	async run(client, message, args) {
			const searchString = querystring.stringify({ term: args.slice(0).join(" ") })


		if (!args.slice(0).join(" ")) return message.channel.send(new MessageEmbed()
            .setColor("#00FF00")
            .setDescription(`You need to specify something you want to search the urban dictionary`)
        )


        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchString}`).then(response => response.json())

        try {
            const [answer] = list

            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Ratings', value: `${answer.thumbs_up} 🔼 \n${answer.thumbs_down} 🔽` },
                )
            message.channel.send(embed)
        } catch (error) {
            console.log(error)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`No results were found for **${args.slice(0).join(" ")}**`)
            )}
	}
}