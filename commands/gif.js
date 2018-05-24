const tools = require('../tools');
const axios = require('axios');
const tokens = require('../../tokens')

exports.run = (client, message, args) => {
  if (!args[0]) {
     return tools.typeMessage(message.channel, 'Please provide a search word')
  }

  message.channel.startTyping();
  axios.get(`https://api.tenor.com/v1/random?key=${tokens.tenor}&q=${args[0]}`)
    .then(res => {
      message.channel.stopTyping();
      tools.sendMessage(message.channel, {files: [res.data.results[0].media[0].mediumgif.url]});
    });
};



