const tools = require('../tools');
const axios = require('axios');

exports.run = (client, message, args) => {
  message.channel.startTyping();
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then(res => {
      message.channel.stopTyping();
      tools.typeMessage(message.channel, {files: [res.data.message]});
    });
};



