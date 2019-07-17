const Discord = require('discord.js')
const client = new Discord.Client()
const https = require('https')

client.on('ready',()=>{
	console.log("Working & Online")
	setInterval(function() {
		var data='';
    	var options = 'https://www.bitmex.com/api/v1/instrument?symbol=XBTUSD&count=100&reverse=true';
		
    	var request = https.request(options, function (res) {
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					var dArr = JSON.parse(data);
					
					client.guilds.get('600017052362735666').members.get(client.user.id).setNickname('BTC $'+dArr[0]['lastPriceProtected'])

					var fT = new Date(dArr[0]['fundingTimestamp']);
					var nowT = new Date(dArr[0]['timestamp']);
					var hours = Math.ceil(Math.abs(fT - nowT) / 36e5);

					client.user.setActivity((dArr[0]['fundingRate']*100).toString()+'%')
				});
    		});
    		request.on('error', function (e) {
        		console.log(e.message)
    		});
    		request.end()  
  	},5000);
});

client.on('message',msg=>{
	if(msg.content === "Hello"){
		msg.reply("Hello0000000!")
	}
});

client.login(process.env.BOT_TOKEN)
