const tools = require('../tools');
const constants = require('../constants');

exports.run = (client, message, args) => {
  tools.typeMessage(message.channel, { files: [tools.randomImgFromFolder(constants.SMUG)] });
};

