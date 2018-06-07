const tools = require('../tools');
const axios = require('axios');

exports.run = (client, message, args) => {
  if (!args[0]) {
    return tools.typeMessage(message.channel, 'Please provide a search word')
  }
  let query = args.slice(0, args.length + 1).join(' ');
  message.channel.startTyping();

  var loading;
  tools.startLoading(message.channel)
    .then(msg => loading = msg);

  axios.get(`https://api.tenor.com/v1/random?key=${tokens.tenor}&q=${query}`)
    .then(res => {
      message.channel.stopTyping();
      tools.sendMessage(message.channel, {files: [res.data.results[0].media[0].mediumgif.url]})
        .then(msg => {
          loading.delete();
        });
    })
    .catch(err => {
      if (err.message === 'Cannot read property \'media\' of undefined')
        loading.delete();
        tools.sendMessage(message.channel, `Could not find any gif matching "${query}", or something went horribly wrong!`)
    });
};