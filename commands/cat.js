const tools = require('../tools');
const axios = require('axios');
var parseXML = require('xml-parser');

exports.run = (client, message, args) => {
  message.channel.startTyping();
  axios.get('http://thecatapi.com/api/images/get?format=xml')
    .then(res => {
      message.channel.stopTyping();
      let parsed = parseXML(res.data);
      let image_root = parsed.root.children[0].children[0].children[0].children[0].content;
      tools.typeMessage(message.channel, { files: [image_root] });
    })
    .catch(err => console.log(err.message));
};




