const tools = require('../tools');
const settings = require('../settings')

exports.run = (client, message, args) => {
  if (!typeof(args[0]) === "string") {
    tools.typeMessage(message.channel, 'Prefix must be a valid string')
    return;
  }
  console.log(message);
  settings.updateGuildPrefix(message.channel.guild.id, args[0]);
  tools.typeMessage(message.channel, 'Prefix updated!');
};



