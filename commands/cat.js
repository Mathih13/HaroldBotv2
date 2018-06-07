const tools = require('../tools');
const axios = require('axios');
var parseXML = require('xml-parser');

exports.run = (client, message, args) => {
  var loading;
  tools.startLoading(message.channel)
    .then(msg => loading = msg);
  message.channel.startTyping();
  axios.get('http://thecatapi.com/api/images/get?format=xml')
    .then(res => {
      message.channel.stopTyping();
      let parsed = parseXML(res.data);
      let image_root = parsed.root.children[0].children[0].children[0].children[0].content;
      tools.sendMessage(message.channel, { files: [image_root] })
        .then(msg => loading.delete());
    })
    .catch(err => console.log(err.message));
};




