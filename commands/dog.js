const tools = require('../tools');
const axios = require('axios');

exports.run = (client, message, args) => {
  var loading;
  tools.startLoading(message.channel)
    .then(msg => loading = msg);
  message.channel.startTyping();
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then(res => {
      message.channel.stopTyping();
      tools.sendMessage(message.channel, {files: [res.data.message]})
        .then(msg => loading.delete());
    });
};



