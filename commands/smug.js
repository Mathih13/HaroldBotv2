const tools = require('../tools');
const constants = require('../constants');

exports.run = (client, message, args) => {
  var loading;
  tools.startLoading(message.channel)
    .then(msg => loading = msg);

  tools.sendMessage(message.channel, { files: [tools.randomImgFromFolder(constants.SMUG)] })
    .then(msg => {
      loading.delete();
    });
};

