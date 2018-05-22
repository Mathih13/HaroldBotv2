let Reactions = function () {};
const tools = require('./tools');
const axios = require('axios');
const constants = require('./constants');
const settings = require('./settings')

let client;

Reactions.prototype.setClient = (c) => client = c;


// Refactor command system to:
// https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/coding-guides/a-basic-command-handler.html
Reactions.prototype.registerMessageEvents = () => {

  client.on('message', message => {
    if (message.author.bot) return;
    let guildID = message.channel.guild.id;
    checkForPhrases(message);
    if (message.content.indexOf(settings.values[guildID].prefix) !== 0) return;

    const args = message.content.slice(settings.values[guildID].prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  })
};


module.exports = new Reactions();



function checkForPhrases(msg) {

  if (msg.content.includes('@everyone')) {
    tools.typeMessage(msg.channel, { files: [tools.randomImgFromFolder(constants.EVERYONE)] }, 2250)
    return;
  }

  if (msg.content.includes('her') || msg.content.includes('she')) {
    if (tools.msgContainsWord(msg, ['her', 'she', 'female'])) {
      if (tools.chancePercentage(settings.values[msg.channel.guild.id].config.easterEggChance.val)) {
        if (tools.chancePercentage(50)) {
          tools.typeMessage(msg.channel, '>her');
        } else {
          tools.typeMessage(msg.channel, '>she');
        }
      }
    }
  }

  if (msg.content.includes('male')) {
    if (tools.msgContainsWord(msg, ['male', 'female'])) {
      if (tools.chancePercentage(settings.values[msg.channel.guild.id].config.easterEggChance.val)) {
        tools.typeMessage(msg.channel, '>male(female)');
      }
    }

  }
}