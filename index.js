const Discord = require('discord.js');
const client = new Discord.Client();
const tools = require('./tools');
const reactions = require('./msgreactions')
const tokens = require('./tokens');


tools.setClient(client);
reactions.setClient(client);

reactions.registerMessageEvents();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

if (process.argv[2] == 'prod')
  client.login(tokens.prod);
else
  client.login(tokens.test);