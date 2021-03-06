const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db')
const { Token } = require('./config.json');
const commands = require('./commands.js');
const ytdl = require('ytdl-core')
const owner = [
	'727545540186865754',
	'749896471213637683'
	]


const client = new Client();
const queue = new Map();

client.on('ready', () => { 
	console.log(`logged in as \n${client.user.tag}`);
	setInterval(() => {
		const statuses = [
			`${client.guilds.cache.size} guilds`,
			'pixelatebot.gq',
			'/help'
		]
		const status = statuses[Math.floor(Math.random() * statuses.length)]
		client.user.setActivity(status, ({
			type: 'WATCHING'
		}))
	}, 5000)
});

client.on('message', async message => {
	const prefix = db.get(`user_${message.author.id}_prefix`) || '/'
	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const cmd = args.shift().toLowerCase();
	const serverQueue = queue.get(message.guild.id)

	switch(cmd) {

		case 'ping':
		let msg = await message.channel.send('Pingging...');
		await msg.edit(`Pong! <:ping:761584890458013696> \`${Date.now() - msg.createdTimestamp}\`ms`)
		break;

		case 'say':
		case 'repeat':
		if(args.length > 0) {
			message.channel.send(args.join(' '));message.delete()
		}
		 else {
			message.channel.send('You did not send any messages to repeat'); }
		break;
		
		case 'help':
		case 'h':
		case 'commands':
		case 'commandlist':
		case 'command-list':
		var embed = new MessageEmbed()
		.setTitle('Help!')
		.setURL('https://pixelatebot.gq/commands')
		.setColor('#00FF00')
		.setFooter(`${client.user.username} v1.2`, `${client.user.displayAvatarURL()}`)
		.setThumbnail('https://media.discordapp.net/attachments/757854328684806144/764001520353804298/help-153094_1280_pixabay_openclipart-vectors-144x144-161_0-1075_1074.png')
		if(!args[0])
			embed
				.setDescription(Object.keys(commands).map(cmd => `\`${cmd.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` - ${commands[cmd].description}`).join('\n'));
		else {
			if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
				let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
				embed
				.setTitle(`Help! - ${command}`)

				if(commands[command].aliases)
					embed.addField(`Command Aliases`, `\`${commands[command].aliases.join('`, `')}\``);
				embed
					.addField('Description', commands[command].description)
					.addField(`Usage`, `\`\`\`${prefix}${commands[command].format}\`\`\``);
			} else {
				embed
				.setColor('RED')
				.setDescription(`The command ${args[0]} has not been found, please check your spelling or you just typo.`)
			}
		  }
		  message.channel.send(embed)
		break;

		case 'ascii':
		case 'asc':
		case 'asci':
		const figlet = require('figlet')
		let msge = args.join(" ");
		if(!msge) return message.channel.send(`Please add some text to make an ASCII`)

        figlet.text(msge, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
    if(data.length > 2000) return message.channel.send("The text need to be 2000 or less than 2000 char...!") 

    message.channel.send('```' + data + '```')
    })
	break;

	case 'info':
	case 'bot-info':
	case 'botinfo':
	case 'bi':
	var embed = new MessageEmbed()
	.setTitle('<:info:762264995458318356> Bot Information <:info:762264995458318356>')
	.setColor('skyblue')
	.addField('Developers', 'Simon Cowell#5226 and Howie#5198', true)
	.addField('Bot Latenzy', `${client.ws.ping}ms`, true)
	.addField('Servers', `${client.guilds.cache.size}`, true)
	.addField('Channels', `${client.channels.cache.size}`, true)
	.addField('Users', `${client.users.cache.size}`, true)
	.addFields('Links', [])
	message.channel.send(embed)
	break;

    case 'eval':
	case 'run':
	const { inspect } = require('util')
	let command = args.slice(0).join(' ')

		
		if(!owner.includes(message.author.id)) return message.channel.send('Sorry, this command is for the developers only!');

		if(!command) return message.channel.send(`****${message.author.username}****, Please add some codes to evaluate!`);

		try{
			const evaled = eval(command)
			var embed = new MessageEmbed()
			.setColor('#00ff00')
			.setTitle('Evaluating')
			.addField('Input', `\`\`\`${command}\`\`\``)
			.addField('Output', `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
			.addField('Type Of', `\`\`\`${typeof(evaled)}\`\`\``)
			.setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`);
			message.channel.send(embed);
		} catch(err){
			var errEmbed = new MessageEmbed()
			.setColor('red')
			.setTitle('Terminal')
			.addField('Type Error', `\`\`\`${err}\`\`\``)
			.setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
			.setTimestamp()
			message.channel.send(errEmbed);
		}
		break;

		case 'exec':
		case 'console':
		const { exec } = require('child_process');
		if(!owner.includes(message.author.id)) return message.channel.send('nou');
		if(!args.join(' ')) return message.channel.send('Please add some commands to execute!');
		

const ls = exec(`${args.join(' ')}`, function (error, stdout, stderr) {
	try{
	var embedE = new MessageEmbed()
	.setTitle('Terminal')
	.setColor('#00FF00')
	.addField('Input', `\`\`\`$: ${args.join(' ')}\`\`\``)
	.addField('Ouput', `\`\`\`${stdout}\n ${stderr}\`\`\``);
	message.channel.send(embedE)
	} catch(error) {
		var errorEmbed = new MessageEmbed()
		.setTitle('Terminal')
		.setColor('#FF0000')
		.setDescription(`\`\`\`${error.stack}\n${error.code}\n${error.signal}\`\`\``)
		.addField(`${stderr}`)
		message.channel.send(errorEmbed)
	}
});
break;

case 'vote':
var embed = new MessageEmbed()
		.setTitle('Vote me from DBL\'s')
		.setColor('skyblue')
		.addField('discord-botlist.eu', `[Vote me here](http://discord-botlist.eu/bots/761576107887034388/vote "Vote me now")`, true)
		.setFooter(`${client.user.username} v1.2`, `${client.user.displayAvatarURL()}`)
		.setTimestamp();
		message.channel.send(embed)
		break;

	case 'wide':
		let member = message.mentions.users.first() || message.author;

		let avatar = args.slice(0).join(' ') || member.displayAvatarURL();

		var atch = new MessageAttachment(`http://vacefron.nl/api/wide?image=${avatar}`, 'wide.png');
		message.channel.send(atch)
		break;

		case 'bad': 
        var embed = new MessageEmbed()
        .setTitle(`${member} is **bad**`)
        .setColor('#FF0000')
        .setImage(`http://api.alexflipnote.dev/bad?image=${avatar}`);
        message.channel.send(embed)
		break;

		case 'facts':
		let repeater = args.join('%20');
		if(!repeater) return message.channel.send('Please add some text to make a facts');
		let URL = `https://api.alexflipnote.dev/facts?text=`
		let att = new MessageAttachment(URL.replace(" ", "%20").replace(" ", "%20")+repeater, 'facts.png')
		message.channel.send(att);
		break;

		case 'captcha':
		if(!args.join('%20')) return message.channel.send('Pllease add some text to make a captcha text')
		let fURL = `https://api.alexflipnote.dev/captcha?text=`
		var atch = new MessageAttachment(fURL.replace(" ", "%20").replace(" ", "%20")+args.join('+'), 'captcha.png')
		message.channel.send(atch);
		break;

		case 'emergencymeeting':
		case 'emergency':
		if(!args.join('%20')) return message.channel.send('Pllease add some text to make a name to ejected text')
		let url = `https://vacefron.nl/api/emergencymeeting?text=`
		var atch = new MessageAttachment(url.replace(" ", "%20").replace(" ", "%20")+args.join('+'), 'amongus-ejected.png')
		message.channel.send(atch);
		break;
		
		case 'playstore':
		case 'play-store':
		case 'app':
			const PlayStore = require("google-play-scraper")
if (!args[0])
      return message.channel.send(
        `Please Give Something To Search - ${message.author.username}`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `No Application Found - ${message.author.username}!`
        );
      }

      let Embed = new MessageEmbed()
        .setColor("GOLD")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Price`, App.priceText, true)
        .addField(`Developer`, App.developer, true)
		.addField('Folder', App.appId, true)
        .addField(`Ratings`, App.scoreText, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
		break;

		case 'play':
		const voiceChannel = message.member.voice.channel
		if(!voiceChannel) return message.channel.send(`**${message.author.username}**, You need to join any voice channel first.`);
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!permissions.has('CONNECT')) return message.channel.send('Sorry but, I do not have permission to connect to the  voice channel!');
		if(!permissions.has('SPEAK')) return message.channel.send(`**${message.author.username}**, Sorry but i do not hav permission to sepak to the voice channel!`)

		const songInfo = await ytdl.getInfo(args[0])
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url
		}

		if(!serverQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 10,
				playing: true
			}
			queue.set(message.guild.id, queueConstruct)

			queueConstruct.songs.push(song)
			try{
			var connection = await voiceChannel.join()
			queueConstruct.connection = connection
			play(message.guild, queueConstruct.songs[0])
		} catch(err){
			console.log('There was an error while connecting to the voice channel \n'+err)
			}
		} else {
			serverQueue.songs.push(song)
			return message.channel.send(`**${song.title}**, has been added to queue!`)
		}
	return undefined;
		break;

		case 'stop':
		if(!message.member.voice.channel) return message.channel.send(`**${message.author.username}**, You need oto join any voice channel first to stop the music!`);
		message.member.voice.channel.leave()
		return undefined;
	}});

	function play(guild, song){
		const serverQueue= queue.get(guild.id)

		if(!song )
			serverQueue.voiceChannel.leave()
			queue.delete(guild.id)
			return

		const dispatcher = serverQueue.connection.play(ytdl(song.url))
		.on('finish', () => {
			serverQueue.songs.shift()
			play(guild, serverQueue.songs[0])
		})
		.on('error', error => {
			console.log(error)
		})
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 10)
	}

require('./server')();
client.login(Token);
