const settings = require('../settings')

exports.run = (client, message, args) => {
  if (!args[0])
    printAllSettings(client, message);
  else
    editSettings(message, args);
};

function editSettings(message, args) {
  if (args[0] === "avg")
    settings.updateGuildAvgTypingSpeed(args[1])
  if (args[0] === "easter")
    settings.updateGuildEasterEggChance(args[1])
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