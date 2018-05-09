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
  let c = tools.Command();

  client.on('message', msg => {
    if (msg.author.bot) return;

    if (msg.content.includes('@everyone')) {
      tools.typeMessage(msg.channel, { files: [tools.randomImgFromFolder(constants.EVERYONE)] }, 2250)
    }
    
    if (msg.content === c + 'smug') {
      tools.typeMessage(msg.channel, { files: [tools.randomImgFromFolder(constants.SMUG)] });
    }

    if (msg.content === c + 'commands') {
        msg.channel.send({
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL,
                },
                fields: [
                    {
                      name: 'smug',
                      value: 'Post a smug anime girl'
                    },
                    {
                        name: 'dog',
                        value: 'Post a random doggo'
                    },
                    {
                        name: 'cat',
                        value: 'COMING SOON'
                    },
                ]
            }
        })
    }

    if (msg.content === c + 'settings') {
      let arr = [];
      for (let key in settings) {
        let current = settings[key];
        arr.push({ key: key, name: current.name, desc: current.desc, val: current.val.toString() });
      }
      msg.channel.send({
          embed: {
              author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL,
              },
              title: 'Settings',
              fields: arr.map (s => { return {name: s.name,  value: s.val} })
          }
      })
    }

    if(msg.content === c + 'dog') {
      msg.channel.startTyping();
      axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
          msg.channel.stopTyping();
          tools.typeMessage(msg.channel, {files: [res.data.message]});
        });
    }

    if (msg.content === c + 'cat') {
      return;
      msg.channel.startTyping();
      axios.get('https://cataas.com/cat', {responseType: 'blob'})
          .then(res => {
            msg.channel.stopTyping();
           tools.typeMessage(msg.channel, { files: [res.data] })
          })
    }


    if (msg.content.includes('her') || msg.content.includes('she')) {
      if (tools.chancePercentage(settings.easterEggChance.val)) {
        if (tools.chancePercentage(50)) {
          tools.typeMessage(msg.channel, '>her');
        } else {
          tools.typeMessage(msg.channel, '>she');
        }
      }
    }

    if (msg.content.includes('male')) {
      if (tools.chancePercentage(settings.easterEggChance.val)) {
        tools.typeMessage(msg.channel, '>male(female)');
      }
    }
    
  });
  
  
};


module.exports = new Reactions();