const path = require('path');
const fs = require('fs');
const constants = require('./constants');
const settings = require('./settings')


let Tools = function () {};
let client;
let command = '!';

let smugFolder = path.resolve(__dirname, './assets/smug/');
let everyoneFolder = path.resolve(__dirname, './assets/everyone/');
let smugImages = [];
let everyoneImages = [];
loadImages();

Tools.prototype.registerCommand = (newCommand) => command = newCommand;

Tools.prototype.Command = () => command;

Tools.prototype.setClient = (c) => client = c;

Tools.prototype.sendMessage = (channel, message) => {
  channel.send(message);
  channel.stopTyping();
  return null;
};

Tools.prototype.sendMessageWithArgs = (channel, message, args) => {
  channel.send(message, args);
  channel.stopTyping();
  return null;
};

Tools.prototype.randomBetween = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

Tools.prototype.chancePercentage = (p) => {
  let bar = Tools.prototype.randomBetween(0, 100);
  return bar <= p;
};

Tools.prototype.typeMessage = (channel, message, override_time) => {
  let config = settings.values[channel.guild.id].config;

  let wait = message.length * (config.avgTypingSpeed.val);
  if (wait > config.typingSpeedThreshold.val) wait = config.typingSpeedThreshold.val;

  if(override_time) wait = override_time;
  channel.startTyping();
  setTimeout(() => {
    channel.send(message);
    channel.stopTyping();
  }, wait);
    return null;
};

Tools.prototype.randomImgFromFolder = (folderPath) => {
    let img;
    if (folderPath === constants.SMUG) {
        img = smugImages[Math.floor(Math.random()*smugImages.length)];
        return smugFolder + '/' + img;
    }

    if (folderPath === constants.EVERYONE) {
        img = everyoneImages[Math.floor(Math.random()*everyoneImages.length)];
        return everyoneFolder + '/' + img;
    }

};


Tools.prototype.msgContainsWord = (msg, words) => {
    let string = msg.content.split(" ");
    for (let i = 0; i < string.length; i++) {
        for (let k = 0; k < words.length; k++) {
            if (string[i] === words[k]) {
                return true;
            }
        }
    }
    return false;
}

function loadImages () {

    fs.readdir(smugFolder, (err, files) => {
        files.forEach(file => {
            smugImages.push(file);
        });
        console.log('Smug Images Loaded')
    });

    fs.readdir(everyoneFolder, (err, files) => {
        files.forEach(file => {
            everyoneImages.push(file);
        });
        console.log('Everyone Images Loaded')
    });
}

const exp = new Tools();
module.exports = exp;