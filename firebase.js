let firebase = require('firebase')

tokens = require('../tokens');

// Helper function for easy data management
// in the app screens/reducers
firebase.toArray = (snapshot) => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(tokens.firebase)
}

module.exports = firebase
