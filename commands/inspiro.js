const tools = require('../tools');
const axios = require('axios');

exports.run = (client, message, args) => {
  message.channel.startTyping();
  axios.get(`http://inspirobot.me/api?generate=true`)
    .then(res => {
      message.channel.stopTyping();
      tools.sendMessage(message.channel, {files: [res.data]});
    });
};



