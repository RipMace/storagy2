const functions = require('firebase-functions');

exports.updateDoc = functions.firestore
  .document('/stores/{userId}/location/{locationId}/items/{itemId}')
  .onUpdate((change, context) => {
    console.log(change, context);
  });
