const Discord = require('discord.js');
const client = new Discord.Client();
const tools = require('./tools');
const reactions = require('./msgreactions');
const tokens = require('../tokens');
const firebase = require('./firebase');
const settings = require('./settings');

tools.setClient(client);
reactions.setClient(client);

reactions.registerMessageEvents();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  firebase.auth().signInWithEmailAndPassword(tokens.firebaseUser, tokens.firebasePassword)
    .then(res => {
      console.log('Signed into firebase');
      loadGuilds();
    });


});

client.on("guildCreate", guild => {
  console.log("Joined a new guild: " + guild.name);
  //Your other stuff like adding to guildArray
  firebase.database().ref('/guilds/' + guild.id).set(settings.defaultSettings);
  settings.loadGuildSettings(guild.id);
});

client.on("guildDelete", guild => {
  firebase.database().ref('/guilds/' + guild.id).remove()
    .then( () => {
      settings.values[guild.id] = null;
      console.log("Left a guild: " + guild.name)
    })
})

if (process.argv[2] === 'prod')
  client.login(tokens.prod);
else
  client.login(tokens.test);




function loadGuilds() {
  firebase.database().ref('/guilds/').once('value')
    .then((snap) => {
      client.guilds.array().forEach(guild => {
        if(!snap.hasChild(guild.id)) {
          firebase.database().ref('/guilds/' + guild.id).set(settings.defaultSettings);
        }
        console.log('Loaded any orphaned guilds');
        settings.loadAllGuildSettings();
      });

    })
}