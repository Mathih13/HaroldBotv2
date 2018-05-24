const settings = require('../settings')
const tools = require('../tools');

exports.run = (client, message, args) => {
  if (!args[0])
    printAllSettings(client, message);
  else
    editSettings(message, args);
};

function editSettings(message, args) {
  let guild = message.channel.guild.id;
  if (args[0] === "avg")
    settings.updateGuildAvgTypingSpeed(guild, args[1]);
  if (args[0] === "easter")
    settings.updateGuildEasterEggChance(guild, args[1]);
  if (args[0] === "reset")
    if (tools.isAdmin(message))
      tools.typeMessage(message.channel, 'Yes!');

  //tools.typeMessage(message.channel, 'Settings updated')
}

function printAllSettings(client, message) {
  let arr = [];
  let guildSettings = settings.values[message.channel.guild.id].config;
  for (let key in guildSettings) {
    let current = guildSettings[key];
    arr.push({key: key, name: current.name, desc: current.desc, val: current.val.toString()});
  }
  message.channel.send({
    embed: {
      author: {
        name: 'Settings',
        icon_url: client.user.avatarURL,
      },
      fields: arr.map(s => {
        return {name: s.name, value: `${s.desc} \n\nCurrent Value: ${s.val}`}
      })
    }
  })
}