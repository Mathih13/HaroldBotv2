const Discord = require('discord.js');
const client = new Discord.Client();
const tools = require('./tools');
const reactions = require('./msgreactions')



tools.setClient(client);
reactions.setClient(client);

reactions.registerMessageEvents();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.login('NDQxNTcxOTMzNjA4NDc2Njcy.DcyNfA.zYXjswH12cWEvhcyviXRcxEZ4_4');