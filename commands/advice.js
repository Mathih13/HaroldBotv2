const tools = require('../tools');
const axios = require('axios');

exports.run = (client, message, args) => {
  message.channel.startTyping();
  axios.get('http://api.adviceslip.com/advice')
    .then(res => {
      message.channel.stopTyping();
      tools.typeMessage(message.channel, {
        embed: {
          author: {
            name: 'Harold Says',
            icon_url: client.user.avatarURL,
          },
          description: res.data.slip.advice
        }
      }, tools.randomBetween(500, 1000))
    })
};