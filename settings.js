const firebase = require('./firebase');


let Settings = function () {
};

Settings.prototype.defaultSettings = {
  prefix: "!",
  config: {
    avgTypingSpeed: {
      name: 'Average Typing Speed',
      val: 0.1 * 1000,
      desc: 'The calculation for average typing speed'
    },
    typingSpeedThreshold: {
      name: 'Typing Speed Threshold',
      val: 1500,
      desc: 'The maximum time that can be spent typing'
    },
    easterEggChance: {
      name: 'Easter Egg Chance (%)',
      val: 3,
      desc: 'The percentage chance for easter egg responses to certain words or phrases'
    },
  }
};

Settings.prototype.loadAllGuildSettings = function () {
  firebase.database().ref('/guilds/').once('value')
    .then(snap => {
      let result = firebase.toArray(snap);
      result.forEach(guild => {
        Settings.prototype.values[guild.key] = guild;
      });
      console.log('Loaded all guild settings');
    })
};

Settings.prototype.loadGuildSettings = function (guildID) {
  firebase.database().ref('/guilds/' + guildID).once('value')
    .then(snap => {
      Settings.prototype.values[guildID] = snap.val();
    })
};

Settings.prototype.removeGuildSettings = function (guildID) {
  Settings.prototype.values[guildID] = null
};

Settings.prototype.updateGuildSettings = function (guildID, updates) {
  let u = {};
  u['/guilds/' + guildID] = updates;
  firebase.database().ref().update(u)
    .then(res => Settings.prototype.loadGuildSettings(guildID));
};

Settings.prototype.updateGuildAvgTypingSpeed = function (guildID, newSpeed) {
  let u = {};
  u['/guilds/' + guildID + '/config/avgTypingSpeed/val'] = newSpeed;
  firebase.database().ref().update(u)
    .then(res => Settings.prototype.loadGuildSettings(guildID));
};

Settings.prototype.updateGuildEasterEggChance = function (guildID, newVal) {
  let u = {};
  u['/guilds/' + guildID + '/config/easterEggChance/val'] = newVal;
  firebase.database().ref().update(u)
    .then(res => Settings.prototype.loadGuildSettings(guildID));
};

Settings.prototype.updateGuildPrefix = function (guildID, newPrefix) {
  let u = {};
  u['/guilds/' + guildID + '/prefix/'] = newPrefix;
  firebase.database().ref().update(u)
    .then(res => Settings.prototype.loadGuildSettings(guildID));
};

Settings.prototype.values = {};

let settings = new Settings();
module.exports = settings;