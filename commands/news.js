const tools = require('../tools');
const axios = require('axios');
const firebase = require('../firebase');

exports.run = (client, message, args) => {
  firebase.database().ref('news').once('value')
    .then(snap => message.channel.send({
      embed: {
        author: {
          name: 'News',
        },
        description: snap.val()
      }
    }))
};



